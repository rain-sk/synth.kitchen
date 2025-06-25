import { IRecipeState } from '../types/recipe';
import { IUpdateModule } from '../actions/update-module';

export const updateModule: React.Reducer<IRecipeState, IUpdateModule> = (
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
