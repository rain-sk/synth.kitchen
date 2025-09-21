import { Connection, Module } from 'synth.kitchen-shared';
import { ModulePosition } from 'synth.kitchen-shared';
import { convertRemToPixels } from '../../../shared/utils/rem-to-px';
import { Modifier } from '../../constants/key';
import { ISelectionDrag } from '../actions/selection-drag';
import { SelectionDragType } from '../actions/selection-drag';
import { INVALID_POSITION } from '../constants/positions';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

type IRectangle = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const rectIntersectsOtherRect = (
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
		rectRight >= otherRectLeft &&
		rectLeft <= otherRectRight &&
		rectBottom >= otherRectTop &&
		rectTop <= otherRectBottom
	);
};

type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const selectionRect = (
	mouseDragStartPosition: ModulePosition,
	currentMousePosition: ModulePosition,
): Rect => ({
	x: Math.min(mouseDragStartPosition[0], currentMousePosition[0]),
	y: Math.min(mouseDragStartPosition[1], currentMousePosition[1]),
	width: Math.abs(mouseDragStartPosition[0] - currentMousePosition[0]),
	height: Math.abs(mouseDragStartPosition[1] - currentMousePosition[1]),
});

const modulesInRange = (
	rect: Rect,
	modules: Record<string, Module>,
	modulePositions: Record<string, ModulePosition>,
): Set<string> => {
	const idsInRange = new Set<string>();

	for (let id in modules) {
		const position = modulePositions[id];

		const navElement = document.getElementsByTagName('nav')[0];
		const moduleElement = document.getElementById(id);

		const width = moduleElement?.clientWidth ?? 0,
			height = moduleElement?.clientHeight ?? 0;

		const onePointFourRem = convertRemToPixels(1.4);

		const moduleRect = {
			x: position[0] - width / 2,
			y: position[1] + navElement.clientHeight - height / 2 - onePointFourRem,
			width,
			height: height + onePointFourRem,
		};

		if (rectIntersectsOtherRect(rect, moduleRect)) {
			idsInRange.add(id);
		}
	}

	return idsInRange;
};

const connectionsInRange = (
	rect: Rect,
	connections: Record<string, Connection>,
): Set<string> => {
	const keysInRange = new Set<string>();

	console.log(rect, connections);
	return keysInRange;
};

export const selectionDrag: React.Reducer<IPatchState, ISelectionDrag> = (
	state,
	action,
) => {
	const shift = (state.heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;

	switch (action.payload.type) {
		case SelectionDragType.DRAG_START: {
			return cloneAndApply(state, {
				mouseDragStartPosition: action.payload.position,
				mouseDragPosition: action.payload.position,
				selectedModules: shift ? state.selectedModules : new Set(),
			});
		}
		case SelectionDragType.DRAG_CONTINUE: {
			const rect = selectionRect(
				state.mouseDragStartPosition,
				action.payload.position,
			);
			const modulesInDrag = modulesInRange(
				rect,
				state.modules,
				state.modulePositions,
			);

			if (modulesInDrag.size > 0) {
				return cloneAndApply(state, {
					mouseDragPosition: action.payload.position,
					pendingModuleSelection: modulesInDrag,
					pendingConnectionSelection: undefined,
				});
			}

			const connectionsInDrag = connectionsInRange(rect, state.connections);

			return cloneAndApply(state, {
				mouseDragPosition: action.payload.position,
				pendingConnectionSelection: connectionsInDrag,
				pendingModuleSelection: undefined,
			});
		}
		case SelectionDragType.DRAG_END: {
			const rect = selectionRect(
				state.mouseDragStartPosition,
				action.payload.position,
			);
			const modulesInPendingSelection = modulesInRange(
				rect,
				state.modules,
				state.modulePositions,
			);

			const newSelection = shift
				? (() => {
						const selection = new Set([...state.selectedModules]);
						modulesInPendingSelection.forEach((id) => {
							if (selection.has(id)) {
								selection.delete(id);
							} else {
								selection.add(id);
							}
						});
						return selection;
				  })()
				: modulesInPendingSelection;

			return cloneAndApply(state, {
				mouseDragStartPosition: INVALID_POSITION,
				mouseDragPosition: INVALID_POSITION,
				selectedModules: newSelection,
				pendingConnectionSelection: undefined,
				pendingModuleSelection: undefined,
			});
		}
		case SelectionDragType.DRAG_CANCEL:
			return cloneAndApply(state, {
				mouseDragStartPosition: INVALID_POSITION,
				mouseDragPosition: INVALID_POSITION,
				selectedModules: new Set(),
				pendingConnectionSelection: undefined,
				pendingModuleSelection: undefined,
			});
	}
};
