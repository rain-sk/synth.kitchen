import { IState } from '../types/state';
import { IUpdateModulePosition } from '../actions/update-module-position';

export const updateModulePosition: React.Reducer<
	IState,
	IUpdateModulePosition
> = (state, action) => ({
	...state,
	modules: {
		...state.modules,
		[action.payload.moduleKey]: {
			...state.modules[action.payload.moduleKey],
			x: action.payload.x,
			y: action.payload.y
		}
	}
});
