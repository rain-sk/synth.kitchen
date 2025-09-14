import { IBlurInput } from '../actions/input-blur';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const blurInput: React.Reducer<IPatchState, IBlurInput> = (state) =>
	cloneAndApply(state, {
		focusedInput: undefined,
	});
