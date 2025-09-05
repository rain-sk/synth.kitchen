import { blankPatch, blankPatchToClearCanvas } from '..';
import { IPatchState } from '../types/patch';
import { IClearPatchEditor } from '../actions/clear-patch-editor';

export const clearPatchEditor: React.Reducer<IPatchState, IClearPatchEditor> = (
	state,
) => ({
	...blankPatch(),
	...blankPatchToClearCanvas(),
	heldModifiers: state.heldModifiers,
});
