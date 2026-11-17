import {
	ISelectConnection,
	SelectConnectionMode,
} from '../actions/select-connection';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const selectConnection: React.Reducer<IPatchState, ISelectConnection> = (
	state,
	action,
) => {
	const { connectionKeys, mode = SelectConnectionMode.REPLACE } = action.payload;

	const keys = connectionKeys.filter((key) => key in state.connections.state);

	let selectedConnections: Set<string>;

	switch (mode) {
		case SelectConnectionMode.ADD:
			selectedConnections = new Set([
				...state.selectedConnections,
				...keys,
			]);
			break;
		case SelectConnectionMode.TOGGLE:
			selectedConnections = new Set(state.selectedConnections);
			keys.forEach((key) =>
				selectedConnections.has(key)
					? selectedConnections.delete(key)
					: selectedConnections.add(key),
			);
			break;
		default:
			selectedConnections = new Set(keys);
	}

	return cloneAndApply(state, {
		selectedConnections,
		selectedModules: new Set(),
		activeConnectorKey: undefined,
	});
};
