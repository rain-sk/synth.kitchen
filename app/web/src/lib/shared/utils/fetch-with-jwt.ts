export const fetchWithJwt = async (
	path: string,
	init: RequestInit = { headers: { Accept: 'application/json' } },
): Promise<Response> => {
	const localJwt = localStorage.getItem('jwt')?.slice(1, -1);
	if (!localJwt) {
		return new Promise((_, reject) => {
			reject('Missing JWT in localstorage');
		});
	}

	const authorization = `Bearer ${localJwt}`;
	return await fetch(
		path,
		'headers' in init
			? {
					...init,
					headers: {
						...init.headers,
						authorization,
					},
				}
			: {
					...init,
					headers: { authorization },
				},
	);
};
