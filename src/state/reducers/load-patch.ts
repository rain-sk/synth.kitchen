import { INVALID_POSITION, IState } from '../types/state';
import { ILoadPatch } from '../actions/load-patch';

export const loadPatch: React.Reducer<IState, ILoadPatch> = (state, action) => {
	const { name, modules, modulePositions, connections } = action.payload.patch;

	return {
		...state,
		name,
		modules,
		modulePositions,
		selectedModuleKeys: new Set(),
		mouseDragPosition: INVALID_POSITION,
		mouseDragStartPosition: INVALID_POSITION,
		selectionPending: false,
		connectionsToLoad: connections
	};
};
