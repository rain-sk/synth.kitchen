import { IState } from '../types/state';
import { IUpdateModuleState } from '../actions/update-module-state';

export const updateModuleState: React.Reducer<IState, IUpdateModuleState> = (
	state,
	action
) => ({
	...state,
	modules: {
		...state.modules,
		[action.payload.moduleKey]: {
			...state.modules[action.payload.moduleKey],
			state: action.payload.state
		}
	}
});
