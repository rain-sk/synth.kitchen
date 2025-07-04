import { IRecipeState } from '../types/recipe';
import { IUpdateModulePosition } from '../actions/update-module-position';

export const updateModulePosition: React.Reducer<
	IRecipeState,
	IUpdateModulePosition
> = (state, action) => {
	const {
		moduleKey,
		position: [x, y],
	} = action.payload;
	const [currentX, currentY] = state.modulePositions[moduleKey];

	const deltaX = x - currentX;
	const deltaY = y - currentY;

	const selectedModuleKeys = state.selectedModuleKeys.has(moduleKey)
		? state.selectedModuleKeys
		: new Set([moduleKey]);
	return {
		...state,
		modulePositions: Object.fromEntries(
			Object.entries(state.modulePositions).map(([moduleKey, position]) => [
				moduleKey,
				selectedModuleKeys.has(moduleKey)
					? [position[0] + deltaX, position[1] + deltaY]
					: position,
			]),
		),
		selectedModuleKeys,
	};
};
