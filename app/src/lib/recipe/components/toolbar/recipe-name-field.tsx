import { useCallback, useContext } from 'react';

import { recipeActions } from '../../state/actions';
import { RecipeContext } from '../../contexts/recipe';

export const RecipeNameField = () => {
	const { name, dispatch } = useContext(RecipeContext);

	const handleNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			dispatch(recipeActions.changeNameAction(e.target.value));
		},
		[dispatch],
	);

	const handleFocus = useCallback(() => {
		dispatch(recipeActions.deselectAllModulesAction());
	}, [dispatch]);

	return (
		<input
			aria-label="recipe name"
			type="text"
			value={name}
			onChange={handleNameChange}
			onFocus={handleFocus}
		/>
	);
};
