import { IChangeName } from '../actions/change-name';
import { IRecipeState } from '../types/recipe';

export const changeName: React.Reducer<IRecipeState, IChangeName> = (
	state,
	action,
) => ({
	...state,
	name: action.payload.name,
});
