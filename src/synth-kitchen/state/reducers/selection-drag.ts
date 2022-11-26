import { INVALID_POSITION, IState } from '../types/state';
import { ISelectionDrag, SelectionDragType } from '../actions/selection-drag';
import { IModule } from '../types/module';

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
				selectedModuleKeys: new Set(),
				selectionPending: true
			};
		}
		case SelectionDragType.DRAG_CONTINUE: {
			const { mouseDragStartPosition, modules } = state;

			return {
				...state,
				mouseDragPosition: position,
				selectedModuleKeys: modulesInRange(
					mouseDragStartPosition,
					position,
					Object.values(modules)
				)
			};
		}
		case SelectionDragType.DRAG_END: {
			const { mouseDragStartPosition, modules } = state;

			return {
				...state,
				mouseDragStartPosition: INVALID_POSITION,
				mouseDragPosition: INVALID_POSITION,
				selectedModuleKeys: modulesInRange(
					mouseDragStartPosition,
					position,
					Object.values(modules)
				),
				selectionPending: false
			};
		}
	}
};
