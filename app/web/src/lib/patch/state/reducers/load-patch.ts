import { blankPatch } from '..';
import { ILoadPatch } from '../actions/load-patch';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const loadPatch: React.Reducer<IPatchState, ILoadPatch> = (
	state,
	action,
) => {
	const newState: Partial<IPatchState> = {
		id: action.payload.id,
		name: action.payload.name,
		slug: action.payload.slug,
		creator: action.payload.creator,
		modules: action.payload.modules,
		modulePositions: action.payload.modulePositions,
		connections: action.payload.connections,
		connectionsToLoad: action.payload.connections,
		heldModifiers: state.heldModifiers,
	};

	return cloneAndApply(blankPatch(), newState);
};
