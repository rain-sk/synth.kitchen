import { INVALID_POSITION, IState } from '../types/state';
import { ILoadPatch } from '../actions/load-patch';

export const loadPatch: React.Reducer<IState, ILoadPatch> = (
	state,
	action
) => ({
	...state,
	modules: action.payload.modules,
	selectedModuleKeys: new Set(),
	mouseDragPosition: INVALID_POSITION,
	mouseDragStartPosition: INVALID_POSITION,
	selectionPending: false
});
