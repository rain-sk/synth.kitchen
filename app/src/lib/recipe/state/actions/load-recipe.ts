import { ISerializedRecipe } from '../types/serialized-recipe';

export type ILoadRecipe = {
	type: 'LoadRecipe';
	payload: ISerializedRecipe;
};

export const loadRecipeAction = (recipe: ISerializedRecipe): ILoadRecipe => ({
	type: 'LoadRecipe',
	payload: recipe,
});
