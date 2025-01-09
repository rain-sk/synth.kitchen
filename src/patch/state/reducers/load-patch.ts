import { INVALID_POSITION, IPatchState } from '../types/patch';
import { ILoadPatch } from '../actions/load-patch';
import { randomId } from '../../../utils/random-id';

export const loadPatch: React.Reducer<IPatchState, ILoadPatch> = (
	state,
	action,
) => {
	const { id, name, modules, modulePositions, connections } =
		action.payload.patch;
	return {
		...state,
		id: id ?? randomId(),
		name,
		modules,
		modulePositions,
		connections,
		connectors: {},
		selectedModuleKeys: new Set(),
		mouseDragPosition: INVALID_POSITION,
		mouseDragStartPosition: INVALID_POSITION,
		selectionPending: false,
		loadingFromCloud: false,
		loadConnections: true,
	};
};
