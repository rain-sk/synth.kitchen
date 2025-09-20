import { Input } from 'synth.kitchen-shared';
import { Output } from 'synth.kitchen-shared';
import { ILoadConnections } from '../actions/load-connections';
import { connect } from '../connection';
import { connectorInfo } from '../connection';
import { connectorKey } from '../connection';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const loadConnections: React.Reducer<IPatchState, ILoadConnections> = (
	state,
) => {
	let connectors = state.connectors;
	Object.values(state.connections).forEach(([output, input]) => {
		output = connectorInfo(connectors, connectorKey(output))[0] as Output;
		input = connectorInfo(connectors, connectorKey(input))[0] as Input;

		const { connectors: newConnectors } = connect(
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