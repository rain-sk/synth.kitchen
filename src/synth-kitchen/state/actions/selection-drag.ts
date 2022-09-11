export enum SelectionDragType {
	DRAG_START,
	DRAG_CONTINUE,
	DRAG_END
}

export type ISelectionDrag = {
	type: 'SelectionDrag';
	payload: {
		type: SelectionDragType;
		position: [number, number];
	};
};

export const selectionDragStartAction = (
	position: [number, number]
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		type: SelectionDragType.DRAG_START,
		position
	}
});

export const selectionDragContinueAction = (
	position: [number, number]
): ISelectionDrag => ({
	type: 'SelectionDrag',
	payload: {
		type: SelectionDragType.DRAG_CONTINUE,
		position
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
