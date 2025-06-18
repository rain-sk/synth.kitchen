import { useEffect, useState } from 'react';

const apiHost = import.meta.env.API_HOST || 'http://localhost:3000';

export const useUser = (jwt: string) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<{ email: string } | undefined>();

	useEffect(() => {
		(async () => {
			if (jwt && !user) {
				setLoading(true);
				try {
					const response = await fetch(`${apiHost}/user`, {
						headers: {
							authorization: `Bearer ${jwt}`,
							Accept: 'application/json',
						},
					}).then((res) => res.json());
					setUser(response.user);
				} catch (e) {
					console.error(e);
				}
			}
			setLoading(false);
		})();
	}, [jwt, user]);

	return { user, loading };
};
