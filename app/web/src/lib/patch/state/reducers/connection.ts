import React from 'react';
import {
	cloneAndApply,
	cloneAndApplyWithHistory,
	IPatchState,
} from '../types/patch';
import { IConnect, IDisconnect } from '../actions/connection';
import {
	connect as connectConnection,
	connectionKey,
	disconnect as disconnectConnection,
	connectorKey,
} from '../connection';
import { Input, Output } from 'synth.kitchen-shared';

export const connect: React.Reducer<IPatchState, IConnect> = (
	state,
	action,
) => {
	let [output, input] = action.payload;
	if (connectionKey(output, input) in state.connections.state) {
		return state;
	}

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);
	if (!(outputKey in state.connectors && inputKey in state.connectors)) {
		return cloneAndApply(state, {
			asyncActionQueue: [action, ...state.asyncActionQueue],
		});
	}

	// load registered connectors with valid accessors
	output = state.connectors[outputKey][0] as Output;
	input = state.connectors[inputKey][0] as Input;

	return cloneAndApplyWithHistory(
		state,
		connectConnection(state.connections, state.connectors, output, input),
	);
};

export const disconnect: React.Reducer<IPatchState, IDisconnect> = (
	state,
	action,
) => {
	if (!(action.payload.connectionKey in state.connections.state)) {
		return state;
	}
	const [output, input] = state.connections.state[action.payload.connectionKey];

	return cloneAndApplyWithHistory(
		state,
		disconnectConnection(state.connections, state.connectors, output, input),
	);
};
