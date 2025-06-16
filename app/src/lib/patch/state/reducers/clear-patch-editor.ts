import { blankPatch, blankPatchToClearCanvas } from '..';
import { IClearPatchEditor } from '../actions/clear-patch-editor';
import { IPatchState } from '../types/patch';

export const clearPatchEditor: React.Reducer<IPatchState, IClearPatchEditor> = (
	state,
) => ({
	...blankPatch(),
	...blankPatchToClearCanvas(),
	heldModifiers: state.heldModifiers,
});
