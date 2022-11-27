import { INVALID_POSITION, IState } from '../types/state';
import { ILoadPatch } from '../actions/load-patch';

export const loadPatch: React.Reducer<IState, ILoadPatch> = (
	state,
	action
) => ({
	...state,
	...action.payload.patch,
	selectedModuleKeys: new Set(),
	mouseDragPosition: INVALID_POSITION,
	mouseDragStartPosition: INVALID_POSITION,
	patchHistory: [],
	patchHistoryOffset: 0,
	selectionPending: false
});
