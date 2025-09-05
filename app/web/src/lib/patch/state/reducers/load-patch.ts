import { blankPatch } from '..';
import { ILoadPatch } from '../actions/load-patch';
import { IPatchState } from '../types/patch';

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
