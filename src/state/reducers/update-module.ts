import { IState } from '../types/state';
import { IUpdateModule } from '../actions/update-module';

export const updateModule: React.Reducer<IState, IUpdateModule> = (
	state,
	action
) => ({
	...state,
	modules: {
		...state.modules,
		[action.payload.moduleKey]: {
			...state.modules[action.payload.moduleKey],
			...action.payload.update
		}
	}
});
