import { useRoute } from 'wouter';
import { RecipeEditor } from '../lib/recipe/components/editor';

export const RecipeRoute = () => {
	const [match, params] = useRoute('/recipe/:id');

	return <RecipeEditor id={match ? params.id : undefined} />;
};
