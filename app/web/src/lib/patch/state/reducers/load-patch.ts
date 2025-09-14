import { blankPatch } from '..';
import { ILoadPatch } from '../actions/load-patch';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const loadPatch: React.Reducer<IPatchState, ILoadPatch> = (
	state,
	action,
) => {
	action.payload;
	return cloneAndApply(blankPatch(), {
		...action.payload,
		heldModifiers: state.heldModifiers,
	});
};
