import { IBlurInput } from '../actions/input-blur';
import { IPatchState } from '../types/patch';

export const blurInput: React.Reducer<IPatchState, IBlurInput> = (state) => ({
	...state,
	focusedInput: undefined,
});
