import { IFocusInput } from '../actions/input-focus';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const focusInput: React.Reducer<IPatchState, IFocusInput> = (
	state,
	action,
) =>
	cloneAndApply(state, {
		focusedInput: action.payload,
	});
