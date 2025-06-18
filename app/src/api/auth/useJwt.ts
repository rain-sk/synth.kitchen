import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'react-use';

const apiHost = import.meta.env.API_HOST || 'http://localhost:3000';

export const useJwt = () => {
	const syncing = useRef(false);
	const [storedJwt, setStoredJwt] = useLocalStorage('jwt', '');
	const [jwt, setJwt] = useState<string>('');

	const loggingOut = useRef(false);
	const logout = useCallback(() => {
		loggingOut.current = true;
		setStoredJwt('');
		setJwt('');
	}, [setJwt, setStoredJwt]);

	useEffect(() => {
		if (loggingOut.current) {
			if (!jwt && !storedJwt) {
				loggingOut.current = false;
			}
		} else if (jwt) {
			if (jwt !== storedJwt) {
				setStoredJwt(jwt);
			}
		} else if (storedJwt) {
			setJwt(storedJwt);
		}
	}, [jwt, storedJwt]);

	const sync = useCallback(async () => {
		if (jwt) {
			syncing.current = true;
			try {
				const response = await fetch(`${apiHost}/token/refresh`, {
					headers: {
						authorization: `Bearer ${jwt}`,
						Accept: 'application/json',
					},
				}).then((res) => res.json());
				console.log(response);
				setJwt(response.jwt);
			} catch (error) {
				console.error(error);
			}
			syncing.current = false;
		}
	}, [jwt, setJwt]);

	useEffect(() => {
		(async () => {
			if (!syncing.current && jwt) {
				const response = await fetch(`${apiHost}/token`, {
					headers: {
						authorization: `Bearer ${jwt}`,
						Accept: 'application/json',
					},
				});
				if (!syncing.current && response.status !== 200) {
					sync();
				}
			}
		})();
	}, [jwt, sync]);

	return { jwt, setJwt, logout };
};
