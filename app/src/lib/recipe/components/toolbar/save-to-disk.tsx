import { useCallback, useContext } from 'react';

import { ISerializedRecipe } from '../../state/types/serialized-recipe';
import { RecipeContext } from '../../contexts/recipe';
import { SaveToDiskSvg } from './svg';

export const SaveToDisk = () => {
	const { id, name, modules, modulePositions, connections } =
		useContext(RecipeContext);

	const onDownload = useCallback(() => {
		const recipe: ISerializedRecipe = {
			id,
			name,
			modules,
			modulePositions,
			connections,
		};

		// https://code.tutsplus.com/tutorials/how-to-save-a-file-with-javascript--cms-41105
		{
			const a = document.createElement('a');
			const blob = new Blob([JSON.stringify(recipe)], {
				type: 'text/json',
			});

			a.setAttribute('href', URL.createObjectURL(blob));
			a.setAttribute('download', `${name}.json`);
			a.click();

			URL.revokeObjectURL(a.href);
		}
	}, [name, modules, modulePositions, connections]);

	return (
		<button type="button" onClick={onDownload}>
			<span className="visually-hidden">save to disk</span>
			<SaveToDiskSvg />
		</button>
	);
};
