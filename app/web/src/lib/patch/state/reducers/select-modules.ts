import { ISelectModules } from '../actions/select-modules';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const selectModules: React.Reducer<IPatchState, ISelectModules> = (
	state,
	action,
) => {
	return cloneAndApply(state, {
		selectedModules: action.payload,
		selectedConnections: new Set(),
		activeConnectorKey: undefined,
	});
};
