import { useRoute } from 'wouter';
import { PatchEditor } from '../lib/patch/components/editor';

export const PatchRoute = () => {
	const [match, params] = useRoute('/patch/:id');

	return <PatchEditor id={match ? params.id : undefined} />;
};
