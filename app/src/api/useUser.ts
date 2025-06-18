import { useEffect, useState } from 'react';

const apiHost = import.meta.env.API_HOST || 'http://localhost:3000';

export const useUser = (jwt: string) => {
	const [user, setUser] = useState<{ email: string } | undefined>();

	useEffect(() => {
		(async () => {
			if (jwt && !user) {
				const response = await fetch(`${apiHost}/user`, {
					headers: {
						authorization: `Bearer ${jwt}`,
						Accept: 'application/json',
					},
				}).then((res) => res.json());
				console.log(response);
				setUser(response.user);
			}
		})();
	}, [jwt]);

	return user;
};
