import { IUpdateModule } from '../actions/update-module';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const updateModule: React.Reducer<IPatchState, IUpdateModule> = (
	state,
	action,
) =>
	cloneAndApply(state, {
		modules: {
			...state.modules,
			[action.payload.moduleKey]: {
				...state.modules[action.payload.moduleKey],
				...action.payload.update,
			},
		},
	});
