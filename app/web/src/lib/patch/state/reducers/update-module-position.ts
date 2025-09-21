import { IUpdateModulePosition } from '../actions/update-module-position';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const updateModulePosition: React.Reducer<
	IPatchState,
	IUpdateModulePosition
> = (state, action) => {
	const {
		id,
		position: [x, y],
	} = action.payload;
	const [currentX, currentY] = state.modulePositions[id];

	const deltaX = x - currentX;
	const deltaY = y - currentY;

	const selectedModules = state.selectedModules.has(id)
		? state.selectedModules
		: new Set([id]);
	return cloneAndApply(state, {
		modulePositions: Object.fromEntries(
			Object.entries(state.modulePositions).map(([id, position]) => [
				id,
				selectedModules.has(id)
					? [position[0] + deltaX, position[1] + deltaY]
					: position,
			]),
		),
		selectedModules,
	});
};
