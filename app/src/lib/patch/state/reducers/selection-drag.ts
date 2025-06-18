import { INVALID_POSITION, IPatchState, Position } from '../types/patch';
import { ISelectionDrag, SelectionDragType } from '../actions/selection-drag';
import { IModule } from '../types/module';
import { Modifier } from '../../constants/key';

type IRectangle = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const rectContainsOtherRect = (
	rect: IRectangle,
	otherRect: IRectangle,
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
	mouseDragStartPosition: Position,
	currentMousePosition: Position,
	modules: Record<string, IModule>,
	modulePositions: Record<string, Position>,
): Set<string> => {
	const moduleKeysInRange = new Set<string>();

	const rect = {
		x: Math.min(mouseDragStartPosition[0], currentMousePosition[0]),
		y: Math.min(mouseDragStartPosition[1], currentMousePosition[1]),
		width: Math.abs(mouseDragStartPosition[0] - currentMousePosition[0]),
		height: Math.abs(mouseDragStartPosition[1] - currentMousePosition[1]),
	};

	for (let moduleKey in modules) {
		const position = modulePositions[moduleKey];

		const navElement = document.getElementsByTagName('nav')[0];
		const moduleElement = document.getElementById(moduleKey);

		const moduleRect = {
			x: position[0],
			y: position[1] + navElement.clientHeight,
			width: moduleElement?.clientWidth ?? 0,
			height: moduleElement?.clientHeight ?? 0,
		};

		if (rectContainsOtherRect(rect, moduleRect)) {
			moduleKeysInRange.add(moduleKey);
		}
	}

	return moduleKeysInRange;
};

export const selectionDrag: React.Reducer<IPatchState, ISelectionDrag> = (
	state,
	action,
) => {
	const shift = (state.heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;

	switch (action.payload.type) {
		case SelectionDragType.DRAG_START: {
			return {
				...state,
				mouseDragStartPosition: action.payload.position,
				mouseDragPosition: action.payload.position,
				selectedModuleKeys: shift ? state.selectedModuleKeys : new Set(),
				selectionPending: true,
			};
		}
		case SelectionDragType.DRAG_CONTINUE: {
			const modulesInDrag = modulesInRange(
				state.mouseDragStartPosition,
				action.payload.position,
				state.modules,
				state.modulePositions,
			);

			return {
				...state,
				mouseDragPosition: action.payload.position,
				pendingSelection: modulesInDrag,
			};
		}
		case SelectionDragType.DRAG_END: {
			const modulesInPendingSelection = modulesInRange(
				state.mouseDragStartPosition,
				action.payload.position,
				state.modules,
				state.modulePositions,
			);

			const newSelection = shift
				? (() => {
						const selection = new Set([...state.selectedModuleKeys]);
						modulesInPendingSelection.forEach((moduleKey) => {
							if (selection.has(moduleKey)) {
								selection.delete(moduleKey);
							} else {
								selection.add(moduleKey);
							}
						});
						return selection;
				  })()
				: modulesInPendingSelection;

			return {
				...state,
				mouseDragStartPosition: INVALID_POSITION,
				mouseDragPosition: INVALID_POSITION,
				selectedModuleKeys: newSelection,
				pendingSelection: undefined,
			};
		}
	}
};
