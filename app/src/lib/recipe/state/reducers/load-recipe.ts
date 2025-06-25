import { IRecipeState } from '../types/recipe';
import { ILoadRecipe } from '../actions/load-recipe';
import { blankRecipe } from '..';

export const loadRecipe: React.Reducer<IRecipeState, ILoadRecipe> = (
	state,
	action,
) => {
	return {
		...blankRecipe(),
		...action.payload,
		heldModifiers: state.heldModifiers,
	};
};
