import { ILoadConnections } from '../actions/load-connections';
import { connect, connectorInfo, connectorKey } from '../connection';
import { IInput, IOutput } from '../types/connection';
import { IRecipeState } from '../types/recipe';

export const loadConnections: React.Reducer<IRecipeState, ILoadConnections> = (
	state,
) => {
	let connectors = state.connectors;
	Object.values(state.connections).forEach(([output, input]) => {
		output = connectorInfo(connectors, connectorKey(output))[0] as IOutput;
		input = connectorInfo(connectors, connectorKey(input))[0] as IInput;

		let { connectors: newConnectors } = connect(
			state.connections,
			connectors,
			output,
			input,
		);
		connectors = newConnectors;
	});

	return {
		...state,
		connectors,
	};
};
