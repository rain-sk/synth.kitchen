import { IBlurInput } from '../actions/input-blur';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const blurInput: React.Reducer<IPatchState, IBlurInput> = (state) =>
	cloneAndApply(state, {
		focusedInput: undefined,
	});