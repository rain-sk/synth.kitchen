import { strapi } from '@strapi/client';

export const client = strapi({ baseURL: 'http://localhost:1337/api' });
const patches = client.collection('patches');
(async () => {
	const allPatches = await patches.find({
		sort: 'title',
	});
	console.log(allPatches);
})();
