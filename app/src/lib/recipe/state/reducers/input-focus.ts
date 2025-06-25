import { IFocusInput } from '../actions/input-focus';
import { IRecipeState } from '../types/recipe';

export const focusInput: React.Reducer<IRecipeState, IFocusInput> = (
	state,
	action,
) => ({
	...state,
	focusedInput: action.payload,
});
