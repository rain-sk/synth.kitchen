import { useRoute } from 'wouter';
import { PatchRoot } from './root';

export const PatchRoute = () => {
	const [match, params] = useRoute('/patch/:slug');

	return <PatchRoot slug={match ? params.slug : undefined} />;
};