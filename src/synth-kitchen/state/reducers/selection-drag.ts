import { INVALID_POSITION, IState } from '../types/state';
import { ISelectionDrag, SelectionDragType } from '../actions/selection-drag';
import { IModule, ModuleSelectionState } from '../types/module';

type IRectangle = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const rectContainsOtherRect = (
	rect: IRectangle,
	otherRect: IRectangle
): boolean => {
	const rectLeft = rect.x;
	const rectTop = rect.y;
	const rectRight = rect.x + rect.width;
	const rectBottom = rect.y + rect.height;

	const otherRectLeft = otherRect.x;
	const otherRectTop = otherRect.y;
	const otherRectRight = otherRect.x + otherRect.width;
	const otherRectBottom = otherRect.y + otherRect.height;

	return (
		rectLeft < otherRectLeft &&
		rectTop < otherRectTop &&
		rectRight > otherRectRight &&
		rectBottom > otherRectBottom
	);
};

const modulesInRange = (
	mouseDragStartPosition: [number, number],
	currentMousePosition: [number, number],
	modules: IModule[]
): Set<string> => {
	const moduleKeysInRange = new Set<string>();

	const rect = {
		x: Math.min(mouseDragStartPosition[0], currentMousePosition[0]),
		y: Math.min(mouseDragStartPosition[1], currentMousePosition[1]),
		width: Math.abs(mouseDragStartPosition[0] - currentMousePosition[0]),
		height: Math.abs(mouseDragStartPosition[1] - currentMousePosition[1])
	};

	modules.forEach((module) => {
		if (rectContainsOtherRect(rect, module)) {
			moduleKeysInRange.add(module.moduleKey);
		}
	});

	return moduleKeysInRange;
};

export const selectionDrag: React.Reducer<IState, ISelectionDrag> = (
	state,
	action
) => {
	const { position } = action.payload;
	switch (action.payload.type) {
		case SelectionDragType.DRAG_START: {
			return {
				...state,
				mouseDragStartPosition: position,
				mouseDragPosition: position,
				modules: Object.fromEntries(
					Object.entries(state.modules).map(([moduleKey, module]) => [
						moduleKey,
						{
							...module,
							selectionState: ModuleSelectionState.UNSELECTED
						}
					])
				)
			};
		}
		case SelectionDragType.DRAG_CONTINUE: {
			const { mouseDragStartPosition, modules } = state;

			const potentiallySelectedModules = modulesInRange(
				mouseDragStartPosition,
				position,
				Object.values(modules)
			);

			return {
				...state,
				mouseDragPosition: position,
				modules: Object.fromEntries(
					Object.entries(modules).map(([moduleKey, module]) => [
						moduleKey,
						{
							...module,
							selectionState: potentiallySelectedModules.has(moduleKey)
								? ModuleSelectionState.POTENTIALLY_SELECTED
								: ModuleSelectionState.UNSELECTED
						}
					])
				)
			};
		}
		case SelectionDragType.DRAG_END:
		default: {
			const { mouseDragStartPosition, modules } = state;

			const selectedModules = modulesInRange(
				mouseDragStartPosition,
				position,
				Object.values(modules)
			);

			return {
				...state,
				mouseDragStartPosition: INVALID_POSITION,
				mouseDragPosition: INVALID_POSITION,
				modules: Object.fromEntries(
					Object.entries(modules).map(([moduleKey, module]) => [
						moduleKey,
						{
							...module,
							selectionState: selectedModules.has(moduleKey)
								? ModuleSelectionState.SELECTED
								: ModuleSelectionState.UNSELECTED
						}
					])
				)
			};
		}
	}
};
