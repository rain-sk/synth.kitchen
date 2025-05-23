import { IPatchState } from '../types/patch';
import { ILoadPatch } from '../actions/load-patch';
import { blankPatch } from '..';

export const loadPatch: React.Reducer<IPatchState, ILoadPatch> = (
	state,
	action,
) => {
	return {
		...blankPatch(),
		...action.payload,
		heldModifiers: state.heldModifiers,
	};
};
