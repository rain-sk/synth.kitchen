import { IUpdateModuleState } from '../actions/update-module-state';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const updateModuleState: React.Reducer<
	IPatchState,
	IUpdateModuleState
> = (state, action) => {
	const module = state.modules[action.payload.id];
	const update = {
		...module,
		state: action.payload.state,
	};
	return cloneAndApply(state, {
		modules: {
			...state.modules,
			[action.payload.id]: update,
		},
	});
};
