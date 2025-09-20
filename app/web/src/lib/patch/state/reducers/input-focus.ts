import { IFocusInput } from '../actions/input-focus';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const focusInput: React.Reducer<IPatchState, IFocusInput> = (
	state,
	action,
) =>
	cloneAndApply(state, {
		focusedInput: action.payload,
	});