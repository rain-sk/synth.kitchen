import { IUpdateModuleName } from '../actions/update-module-name';
import { cloneAndApplyWithHistory } from '../types/patch';
import { IPatchState } from '../types/patch';

export const updateModuleName: React.Reducer<IPatchState, IUpdateModuleName> = (
	state,
	action,
) => {
	const module = state.modules[action.payload.id];
	const update = {
		...module,
		name: action.payload.name,
	};
	return cloneAndApplyWithHistory(state, {
		modules: {
			...state.modules,
			[action.payload.id]: update,
		},
	});
};
