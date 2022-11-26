import { IState } from '../types/state';
import { IUpdateModulePosition } from '../actions/update-module-position';

export const updateModulePosition: React.Reducer<
	IState,
	IUpdateModulePosition
> = (state, action) => {
	const { moduleKey, x, y } = action.payload;

	const selectedModuleKeys = state.selectedModuleKeys.has(moduleKey)
		? state.selectedModuleKeys
		: new Set([moduleKey]);

	const deltaX = state.modules[moduleKey].x - x;
	const deltaY = state.modules[moduleKey].y - y;

	const newState = {
		...state,
		modules: Object.fromEntries(
			Object.entries(state.modules).map(([moduleKey, module]) => [
				moduleKey,
				selectedModuleKeys.has(moduleKey)
					? {
							...module,
							x: module.x - deltaX,
							y: module.y - deltaY
					  }
					: module
			])
		),
		selectedModuleKeys
	};

	return newState;
};
