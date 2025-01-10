import { useRoute } from 'wouter';
import { PatchEditor } from '../patch/components/editor';

export const PatchRoute = () => {
	const [match, params] = useRoute('/patch/:id');

	return <PatchEditor id={match ? params.id : undefined} />;
};
