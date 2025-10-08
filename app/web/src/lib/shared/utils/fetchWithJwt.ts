const jwtHeaders = () => ({
	authorization: `Bearer ${localStorage.getItem('jwt')?.slice(1, -1) ?? ''}`,
});

export const fetchWithJwt = async (
	path: string,
	init: RequestInit = { headers: { Accept: 'application/json' } },
): Promise<Response> =>
	await fetch(
		path,
		'headers' in init
			? {
					...init,
					headers: {
						...init.headers,
						...jwtHeaders(),
					},
			  }
			: {
					...init,
					headers: jwtHeaders(),
			  },
	);
