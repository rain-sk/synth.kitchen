import { INVALID_POSITION, IState } from '../types/state';

export const isSelecting = (state: IState): boolean =>
	state.mouseDragStartPosition != INVALID_POSITION;
