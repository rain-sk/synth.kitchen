import {
	CONNECTIONS_STATE_VERSIONS,
	ConnectionsState,
	Input,
	Output,
} from 'synth.kitchen-shared';

import { ILoadConnections } from '../actions/load-connections';
import { connect, connectorInfo, connectorKey } from '../connection';
import {
	cloneAndApply,
	cloneAndApplyWithHistory,
	IPatchState,
} from '../types/patch';
import { unblockHistory } from './history';

export const loadConnections: React.Reducer<IPatchState, ILoadConnections> = (
	state,
) => {
	const connectionsToLoad = Object.entries(
		state.connectionsToLoad?.state ?? {},
	);

	const newState = {
		connections: state.connections,
		connectors: state.connectors,
	} as Pick<IPatchState, 'connectors'> &
		Pick<IPatchState, 'connections'> &
		Partial<IPatchState>;
	for (let [key, [output, input]] of connectionsToLoad) {
		const outputKey = connectorKey(output);
		const inputKey = connectorKey(input);

		const connectorsRegistered =
			outputKey in state.connectors && inputKey in state.connectors;

		if (connectorsRegistered) {
			output = connectorInfo(
				newState.connectors,
				connectorKey(output),
			)[0] as Output;
			input = connectorInfo(
				newState.connectors,
				connectorKey(input),
			)[0] as Input;

			try {
				const { connections: newConnections, connectors: newConnectors } =
					connect(newState.connections, newState.connectors, output, input);
				newState.connections = newConnections;
				newState.connectors = newConnectors;
			} catch (e) {
				console.warn(e);
			}
		} else if (!newState.connectionsToLoad) {
			newState.connectionsToLoad = {
				version: CONNECTIONS_STATE_VERSIONS[0],
				state: {
					[key]: [output, input],
				},
			};
		} else {
			newState.connectionsToLoad.state[key] = [output, input];
		}
	}

	if (
		!newState.connectionsToLoad ||
		Object.keys(newState.connectionsToLoad).length === 0
	) {
		return cloneAndApplyWithHistory(unblockHistory(state), {
			...newState,
			connectionsToLoad: undefined,
		});
	} else {
		return cloneAndApply(state, newState);
	}
};
