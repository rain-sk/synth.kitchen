import { useCallback, useContext } from 'react';

import { ISerializedRecipe } from '../../state/types/serialized-recipe';
import { KeyCode } from '../../constants/key';
import { OpenFromDiskSvg } from './svg';
import { recipeActions } from '../../state/actions';
import { RecipeContext } from '../../contexts/recipe';
import { blankRecipeToClearCanvas } from '../../state';

export const LoadFromDisk = () => {
	const { dispatch } = useContext(RecipeContext);

	// https://researchhubs.com/post/computing/javascript/open-a-local-file-with-javascript.html
	const onUpload = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = (e.target as any).files[0];
			if (!file) {
				return;
			}
			dispatch(recipeActions.loadRecipeAction(blankRecipeToClearCanvas()));
			const reader = new FileReader();
			reader.onload = (e) => {
				const recipe = JSON.parse(
					(e.target as any).result,
				) as ISerializedRecipe;
				dispatch(recipeActions.loadRecipeAction(recipe));
			};
			reader.readAsText(file);
		},
		[dispatch],
	);

	const handleLoadKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
		if (e.keyCode === KeyCode.ENTER || e.keyCode === KeyCode.SPACE) {
			e.preventDefault();
			(e.nativeEvent.target as any).querySelector('input').click();
		}
	};

	return (
		<label id="load" tabIndex={0} onKeyDown={handleLoadKeyDown}>
			<span className="visually-hidden">open from disk</span>
			<OpenFromDiskSvg />
			<input type="file" onChange={onUpload} accept="application/json" />
		</label>
	);
};
