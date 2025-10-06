import { Connection, connectorKey, Module } from 'synth.kitchen-shared';
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

const emptySet = new Set<string>();

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

	const main = document.getElementById('main');
	const scrollX = main?.scrollLeft ?? 0;
	const scrollY = main?.scrollTop ?? 0;
	const connectorCache: Record<string, DOMRect> = {};
	for (const [id, connection] of Object.entries(connections)) {
		const [output, input] = connection;
		const outputKey = connectorKey(output);
		const inputKey = connectorKey(input);

		const outputRect =
			connectorCache[outputKey] ??
			document.getElementById(outputKey)?.getBoundingClientRect();
		const inputRect =
			connectorCache[inputKey] ??
			document.getElementById(inputKey)?.getBoundingClientRect();
		connectorCache[outputKey] = outputRect;
		connectorCache[inputKey] = inputRect;

		const outputX = outputRect.x + scrollX;
		const outputY = outputRect.y + scrollY;
		const inputX = inputRect.x + scrollX;
		const inputY = inputRect.y + scrollY;

		if (
			outputX >= rect.x &&
			outputX <= rect.x + rect.width &&
			outputY >= rect.y &&
			outputY <= rect.y + rect.height
		) {
			keysInRange.add(id);
			continue;
		}

		if (
			inputX >= rect.x &&
			inputX <= rect.x + rect.width &&
			inputY >= rect.y &&
			inputY <= rect.y + rect.height
		) {
			keysInRange.add(id);
			continue;
		}

		const rectLeft = rect.x;
		const rectTop = rect.y;
		const rectRight = rect.x + rect.width;
		const rectBottom = rect.y + rect.height;

		const lineIntersectsRectEdge = (
			lineStartX: number,
			lineStartY: number,
			lineEndX: number,
			lineEndY: number,
			edgeLeft: number,
			edgeTop: number,
			edgeRight: number,
			edgeBottom: number,
		): boolean => {
			const edgeLines = [
				{ x1: edgeLeft, y1: edgeTop, x2: edgeRight, y2: edgeTop },
				{ x1: edgeRight, y1: edgeTop, x2: edgeRight, y2: edgeBottom },
				{ x1: edgeRight, y1: edgeBottom, x2: edgeLeft, y2: edgeBottom },
				{ x1: edgeLeft, y1: edgeBottom, x2: edgeLeft, y2: edgeTop },
			];

			for (const edge of edgeLines) {
				if (
					lineIntersectsLine(
						lineStartX,
						lineStartY,
						lineEndX,
						lineEndY,
						edge.x1,
						edge.y1,
						edge.x2,
						edge.y2,
					)
				) {
					return true;
				}
			}

			return false;
		};

		const lineIntersectsLine = (
			x1: number,
			y1: number,
			x2: number,
			y2: number,
			x3: number,
			y3: number,
			x4: number,
			y4: number,
		): boolean => {
			const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

			if (Math.abs(denominator) < 1e-10) {
				return false;
			}

			const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
			const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denominator;

			return t >= 0 && t <= 1 && u >= 0 && u <= 1;
		};

		if (
			lineIntersectsRectEdge(
				outputX,
				outputY,
				inputX,
				inputY,
				rectLeft,
				rectTop,
				rectRight,
				rectBottom,
			)
		) {
			keysInRange.add(id);
		}
	}

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
				selectedModules: shift ? state.selectedModules : emptySet,
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

			if (modulesInPendingSelection.size > 0) {
				const newSelection = shift
					? (() => {
							const selection = new Set(Array.from(state.selectedModules));
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
					selectedConnections: emptySet,
					selectedModules: newSelection,
					pendingConnectionSelection: undefined,
					pendingModuleSelection: undefined,
				});
			}

			const connectionsInPendingSelection = connectionsInRange(
				rect,
				state.connections,
			);

			const newSelection = shift
				? (() => {
						const selection = new Set(Array.from(state.selectedConnections));
						connectionsInPendingSelection.forEach((id) => {
							if (selection.has(id)) {
								selection.delete(id);
							} else {
								selection.add(id);
							}
						});
						return selection;
				  })()
				: connectionsInPendingSelection;

			return cloneAndApply(state, {
				mouseDragStartPosition: INVALID_POSITION,
				mouseDragPosition: INVALID_POSITION,
				selectedConnections: newSelection,
				selectedModules: emptySet,
				pendingConnectionSelection: undefined,
				pendingModuleSelection: undefined,
			});
		}
		case SelectionDragType.DRAG_CANCEL:
			return cloneAndApply(state, {
				mouseDragStartPosition: INVALID_POSITION,
				mouseDragPosition: INVALID_POSITION,
				pendingConnectionSelection: undefined,
				pendingModuleSelection: undefined,
			});
	}
};
