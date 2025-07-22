import { Position } from '../types/patch';

export enum SelectionDragType {
	DRAG_START,
	DRAG_CONTINUE,
	DRAG_END,
}

export type ISelectionDrag = {
	type: 'SelectionDrag';
	payload: {
		position: Position;
		type: SelectionDragType;
	};
};

export const selectionDragStartAction = (
	position: Position,
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		position,
		type: SelectionDragType.DRAG_START,
	},
});

export const selectionDragContinueAction = (
	position: Position,
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		position,
		type: SelectionDragType.DRAG_CONTINUE,
	},
});

export const selectionDragEndAction = (position: Position): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		type: SelectionDragType.DRAG_END,
		position,
	},
});
