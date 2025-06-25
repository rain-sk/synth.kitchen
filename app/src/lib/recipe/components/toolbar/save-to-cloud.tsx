import { useCallback, useContext } from 'react';

// import { ISerializedRecipe } from '../../state/types/serialized-recipe';
import { RecipeContext } from '../../contexts/recipe';
import { SaveToCloudSvg } from './svg/save-to-cloud';
// import { useApi } from '../../../api/use-api';

export const SaveToCloud = () => {
	const { id, name, modules, modulePositions, connections } =
		useContext(RecipeContext);

	// const { saveRecipe } = useApi();
	const saveRecipe = (/*recipe: ISerializedRecipe*/) => {};

	const onSave = useCallback(() => {
		// const recipe: ISerializedRecipe = {
		// 	id,
		// 	name,
		// 	modules,
		// 	modulePositions,
		// 	connections,
		// };
		// saveRecipe(recipe);
	}, [id, name, modules, modulePositions, connections, saveRecipe]);

	return (
		<button type="button" onClick={onSave}>
			<span className="visually-hidden">save to cloud</span>
			<SaveToCloudSvg />
		</button>
	);
};
