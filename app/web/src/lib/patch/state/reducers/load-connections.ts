import { Input } from 'synth.kitchen-shared';
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
	const newState: Partial<IPatchState> = {
		connectors: state.connectors,
		connectionsToLoad: { version: state.connections.version, state: {} },
	};
	for (let [key, [output, input]] of Object.entries(state.connections.state)) {
		const outputKey = connectorKey(output);
		const inputKey = connectorKey(input);

		const connectorsRegistered =
			outputKey in state.connectors && inputKey in state.connectors;

		if (!connectorsRegistered || !newState.connectors) {
			const connectionsToLoad = (newState as IPatchState).connectionsToLoad;
			if (connectionsToLoad) {
				connectionsToLoad.state[key] = [output, input];
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
				const { connectors: newConnectors } = connect(
					state.connections,
					newState.connectors,
					output,
					input,
				);
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
