import { IFocusInput } from '../actions/input-focus';
import { IPatchState } from '../types/patch';

export const focusInput: React.Reducer<IPatchState, IFocusInput> = (
	state,
	action,
) => ({
	...state,
	focusedInput: action.payload,
});
