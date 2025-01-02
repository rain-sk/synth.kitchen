import { IPatchState } from '../types/state';
import { IUpdateModule } from '../actions/update-module';

export const updateModule: React.Reducer<IPatchState, IUpdateModule> = (
	state,
	action,
) => ({
	...state,
	modules: {
		...state.modules,
		[action.payload.moduleKey]: {
			...state.modules[action.payload.moduleKey],
			...action.payload.update,
		},
	},
});
