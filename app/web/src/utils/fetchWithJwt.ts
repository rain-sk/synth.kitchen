const jwtHeaders = (jwt: string) => ({
	authorization: `Bearer ${jwt}`,
	Accept: 'application/json',
});

export const fetchWithJwt = async (
	path: string,
	jwt: string,
	init: RequestInit = { headers: {} },
): Promise<Response> => {
	return await fetch(
		path,
		'headers' in init
			? {
					...init,
					headers: {
						...init.headers,
						...jwtHeaders(jwt),
					},
			  }
			: {
					...init,
					headers: jwtHeaders(jwt),
			  },
	);
};
