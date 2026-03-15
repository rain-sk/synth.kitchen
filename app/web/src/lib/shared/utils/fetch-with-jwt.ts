export const fetchWithJwt = async (
	path: string,
	init: RequestInit = { headers: { Accept: 'application/json' } },
): Promise<Response> => {
	const localJwt = localStorage.getItem('jwt')?.slice(1, -1);

	const authorization = localJwt ? `Bearer ${localJwt}` : undefined;
	const headers =
		'headers' in init
			? {
					...init.headers,
					authorization,
				}
			: authorization
				? { authorization }
				: {};

	return await fetch(path, {
		...init,
		headers,
	});
};
