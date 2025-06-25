import React from 'react';

import { blankRecipe } from '../state';
import { IRecipeAction } from '../state/actions';
import { IRecipeState } from '../state/types/recipe';

type RecipeContextValue = IRecipeState & {
	dispatch: React.Dispatch<IRecipeAction>;
};

export const RecipeContext = React.createContext<RecipeContextValue>({
	...blankRecipe(),
	dispatch: () => {},
});

export const RecipeContextProvider: React.FC<
	React.PropsWithChildren<RecipeContextValue>
> = (props) => {
	return (
		<RecipeContext.Provider value={props}>
			{props.children}
		</RecipeContext.Provider>
	);
};
