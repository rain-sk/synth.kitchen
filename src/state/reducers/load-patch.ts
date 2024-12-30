import { INVALID_POSITION, IState } from '../types/state';
import { ILoadPatch } from '../actions/load-patch';
import { randomId } from '../../utils/random-id';

export const loadPatch: React.Reducer<IState, ILoadPatch> = (state, action) => {
	const { id, name, modules, modulePositions, connections } =
		action.payload.patch;

	return {
		...state,
		id: id ?? randomId(),
		name,
		modules,
		modulePositions,
		selectedModuleKeys: new Set(),
		mouseDragPosition: INVALID_POSITION,
		mouseDragStartPosition: INVALID_POSITION,
		connectionsToLoad: connections,
		selectionPending: false,
		loadingFromCloud: false,
	};
};
