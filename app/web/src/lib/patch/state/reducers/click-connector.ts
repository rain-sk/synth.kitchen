import { IPatchState } from '../types/patch';
import { IClickConnector } from '../actions/click-connector';
import {
	connect,
	connectionKey,
	connectorInfo,
	connectorKey,
	disconnect,
} from '../connection';
import { Input, IoType, Output } from 'synth.kitchen-shared';

export const clickConnector: React.Reducer<IPatchState, IClickConnector> = (
	state,
	action,
) => {
	const clicked = action.payload;

	if (!state.activeConnectorKey) {
		return {
			...state,
			activeConnectorKey: connectorKey(clicked),
		};
	}

	const active = connectorInfo(state.connectors, state.activeConnectorKey);
	const activeConnector = active[0];
	const activeConnectorIsOutput =
		'type' in activeConnector && activeConnector.type === IoType.output;
	const clickedConnectorIsOutput =
		'type' in clicked && clicked.type === IoType.output;
	if (activeConnectorIsOutput !== clickedConnectorIsOutput) {
		const output = (
			activeConnectorIsOutput ? activeConnector : clicked
		) as Output;
		const input = (
			activeConnectorIsOutput ? clicked : activeConnector
		) as Input;

		const key = connectionKey(output, input);

		const { connections, connectors } =
			key in state.connections
				? disconnect(state.connections, state.connectors, output, input)
				: connect(state.connections, state.connectors, output, input);
		return {
			...state,
			activeConnectorKey: undefined,
			connections,
			connectors,
		};
	}

	return {
		...state,
		activeConnectorKey: undefined,
	};
};
