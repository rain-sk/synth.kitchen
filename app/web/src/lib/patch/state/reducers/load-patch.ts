import { blankPatch } from '..';
import { ILoadPatch } from '../actions/load-patch';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

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