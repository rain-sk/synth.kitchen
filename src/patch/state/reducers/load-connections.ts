import { ILoadConnections } from '../actions/load-connections';
import { connect, connectorInfo, connectorKey } from '../connection';
import { IInput, IOutput } from '../types/connection';
import { IPatchState } from '../types/patch';

export const loadConnections: React.Reducer<IPatchState, ILoadConnections> = (
	state,
) => {
	if (!state.connectionsToLoad) {
		return { ...state };
	}

	const { connections, connectors } = (() => {
		let connections = state.connections;
		let connectors = state.connectors;
		Object.values(state.connectionsToLoad).forEach(([output, input]) => {
			output = connectorInfo(connectors, connectorKey(output))[0] as IOutput;
			input = connectorInfo(connectors, connectorKey(input))[0] as IInput;

			let { connections: newConnections, connectors: newConnectors } = connect(
				connections,
				state.connectors,
				output,
				input,
			);
			connections = newConnections;
			connectors = newConnectors;
		});
		return { connections, connectors };
	})();

	return {
		...state,
		connections,
		connectors,
		connectionsToLoad: undefined,
	};
};
