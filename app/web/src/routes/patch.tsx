import { useRoute } from 'wouter';

import { PatchEditor } from '../lib/patch/components/editor';

export const PatchRoute = () => {
	const [match, params] = useRoute('/patch/:slug');

	const slug = match ? params.slug : undefined;

	return <PatchEditor slug={slug} />;
};
