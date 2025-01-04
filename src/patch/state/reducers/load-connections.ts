import { ILoadConnections } from '../actions/load-connections';
import { connect } from '../connection';
import { IPatchState } from '../types/patch';

export const loadConnections: React.Reducer<IPatchState, ILoadConnections> = (
	state,
	action,
) => {
	console.log(action.payload);
	const connections = (() => {
		let connections = state.connections;
		Object.values(action.payload).forEach(([output, input]) => {
			let { connections: newConnections } = connect(
				connections,
				state.connectors,
				output,
				input,
			);
			connections = newConnections;
		});
		return connections;
	})();
	console.log(connections);
	return {
		...state,
		connections,
		connectionsToLoad: undefined,
	};
};
