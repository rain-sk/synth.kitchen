import React from 'react';
import { cloneAndApply, IPatchState } from '../types/patch';
import { IConnect, IDisconnect } from '../actions/connection';
import {
	connectionKey,
	connectOrDisconnect,
	connectorKey,
} from '../connection';
import { Input, Output } from 'synth.kitchen-shared';

export const connect: React.Reducer<IPatchState, IConnect> = (
	state,
	action,
) => {
	let [output, input] = action.payload;
	if (connectionKey(output, input) in state.connections) {
		return state;
	}

	const outputKey = connectorKey(output);
	const inputKey = connectorKey(input);
	if (!(outputKey in state.connectors && inputKey in state.connectors)) {
		return cloneAndApply(state, {
			asyncActionQueue: [action, ...state.asyncActionQueue],
		});
	}

	output = state.connectors[outputKey][0] as Output;
	input = state.connectors[inputKey][0] as Input;

	return cloneAndApply(
		state,
		connectOrDisconnect(state.connections, state.connectors, output, input),
	);
};

export const disconnect: React.Reducer<IPatchState, IDisconnect> = (
	state,
	action,
) => {
	if (!(action.payload.connectionKey in state.connections)) {
		return state;
	}
	const [output, input] = state.connections[action.payload.connectionKey];
	const newState = connectOrDisconnect(
		state.connections,
		state.connectors,
		output,
		input,
	);
	return cloneAndApply(state, newState);
};
