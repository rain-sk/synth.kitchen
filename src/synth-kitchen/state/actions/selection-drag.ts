export enum SelectionDragType {
	DRAG_START,
	DRAG_CONTINUE,
	DRAG_END
}

export type ISelectionDrag = {
	type: 'SelectionDrag';
	payload: {
		position: [number, number];
		type: SelectionDragType;
	};
};

export const selectionDragStartAction = (
	position: [number, number]
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		position,
		type: SelectionDragType.DRAG_START
	}
});

export const selectionDragContinueAction = (
	position: [number, number]
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		position,
		type: SelectionDragType.DRAG_CONTINUE
	}
});

export const selectionDragEndAction = (
	position: [number, number]
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		type: SelectionDragType.DRAG_END,
		position
	}
});
