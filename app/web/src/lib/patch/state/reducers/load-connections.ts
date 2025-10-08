import { CONNECTIONS_STATE_VERSIONS, Input } from 'synth.kitchen-shared';
import { Output } from 'synth.kitchen-shared';
import { ILoadConnections } from '../actions/load-connections';
import { connect } from '../connection';
import { connectorInfo } from '../connection';
import { connectorKey } from '../connection';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';
import { unblockHistory } from './history';

export const loadConnections: React.Reducer<IPatchState, ILoadConnections> = (
	state,
) => {
	const newState = {
		connections: state.connections,
		connectors: state.connectors,
		connectionsToLoad: { version: state.connections.version, state: {} },
	} as Pick<IPatchState, 'connectors'> &
		Pick<IPatchState, 'connectionsToLoad'> &
		Pick<IPatchState, 'connections'>;
	for (let [key, [output, input]] of Object.entries(
		state.connectionsToLoad?.state ?? {},
	)) {
		const outputKey = connectorKey(output);
		const inputKey = connectorKey(input);

		const connectorsRegistered =
			outputKey in state.connectors && inputKey in state.connectors;

		if (!connectorsRegistered) {
			const connectionsToLoad = newState.connectionsToLoad;
			if (connectionsToLoad) {
				connectionsToLoad.state[key] = [output, input];
			} else {
				newState.connectionsToLoad = {
					version: CONNECTIONS_STATE_VERSIONS[0],
					state: { [key]: [output, input] },
				};
			}
		} else {
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
		}
	}

	if (Object.keys(newState.connectionsToLoad ?? {}).length === 0) {
		state = unblockHistory(state);
	}

	return cloneAndApply(state, newState);
};
