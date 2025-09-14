import { connect, connectorInfo, connectorKey } from '../connection';
import { ILoadConnections } from '../actions/load-connections';
import { Input, Output } from 'synth.kitchen-shared';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const loadConnections: React.Reducer<IPatchState, ILoadConnections> = (
	state,
) => {
	let connectors = state.connectors;
	Object.values(state.connections).forEach(([output, input]) => {
		output = connectorInfo(connectors, connectorKey(output))[0] as Output;
		input = connectorInfo(connectors, connectorKey(input))[0] as Input;

		let { connectors: newConnectors } = connect(
			state.connections,
			connectors,
			output,
			input,
		);
		connectors = newConnectors;
	});

	return cloneAndApply(state, {
		connectors,
	});
};
