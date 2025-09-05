import { ModulePosition } from 'synth.kitchen-shared';
import { INVALID_POSITION } from '../constants/positions';

export enum SelectionDragType {
	DRAG_START,
	DRAG_CONTINUE,
	DRAG_END,
	DRAG_CANCEL,
}

export type ISelectionDrag = {
	type: 'SelectionDrag';
	payload: {
		position: ModulePosition;
		type: SelectionDragType;
	};
};

export const selectionDragStartAction = (
	position: ModulePosition,
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		position,
		type: SelectionDragType.DRAG_START,
	},
});

export const selectionDragContinueAction = (
	position: ModulePosition,
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		position,
		type: SelectionDragType.DRAG_CONTINUE,
	},
});

export const selectionDragEndAction = (
	position: ModulePosition,
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		type: SelectionDragType.DRAG_END,
		position,
	},
});

export const selectionDragCancelAction = (): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		type: SelectionDragType.DRAG_CANCEL,
		position: INVALID_POSITION,
	},
});
