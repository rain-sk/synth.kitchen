import { IBlurInput } from '../actions/input-blur';
import { IRecipeState } from '../types/recipe';

export const blurInput: React.Reducer<IRecipeState, IBlurInput> = (state) => ({
	...state,
	focusedInput: undefined,
});
