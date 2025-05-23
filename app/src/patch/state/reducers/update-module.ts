import { IPatchState } from '../types/patch';
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
