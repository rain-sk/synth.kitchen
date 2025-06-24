import { useEffect, useState } from 'react';
import { AuthenticatedUserInfo } from 'shared';

import { apiBase } from '../uri';

export const useUser = (jwt: string) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<AuthenticatedUserInfo | undefined>();

	useEffect(() => {
		(async () => {
			if (jwt && !user) {
				setLoading(true);
				try {
					const response = await fetch(`${apiBase}/auth/user`, {
						headers: {
							authorization: `Bearer ${jwt}`,
							Accept: 'application/json',
						},
					}).then((res) => res.json());
					console.log(response.user);
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
