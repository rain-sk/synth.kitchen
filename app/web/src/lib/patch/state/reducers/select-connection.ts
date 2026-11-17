import { ISelectConnection } from '../actions/select-connection';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const selectConnection: React.Reducer<IPatchState, ISelectConnection> = (
	state,
	action,
) => {
	const { connectionKeys, toggle } = action.payload;

	const selectedConnections = new Set(state.selectedConnections);

	connectionKeys
		.filter((key) => key in state.connections.state)
		.forEach((key) => {
			if (toggle && selectedConnections.has(key)) {
				selectedConnections.delete(key);
			} else {
				selectedConnections.add(key);
			}
		});

	return cloneAndApply(state, {
		selectedConnections,
		selectedModules: new Set(),
		activeConnectorKey: undefined,
	});
};
