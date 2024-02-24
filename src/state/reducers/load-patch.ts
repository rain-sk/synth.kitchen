import { INVALID_POSITION, IState } from '../types/state';
import { ILoadPatch } from '../actions/load-patch';

export const loadPatch: React.Reducer<IState, ILoadPatch> = (state, action) => {
	const { connections, modules, name } = action.payload.patch;

	return {
		...state,
		modules,
		name,
		selectedModuleKeys: new Set(),
		mouseDragPosition: INVALID_POSITION,
		mouseDragStartPosition: INVALID_POSITION,
		patchHistory: [],
		patchHistoryOffset: 0,
		selectionPending: false,
		connectionsToLoad: connections
	};
};
