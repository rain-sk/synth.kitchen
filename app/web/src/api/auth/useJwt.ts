import { useLocalStorage } from 'react-use';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navigate } from 'wouter/use-browser-location';

import { fetchWithJwt } from '../../lib/shared/utils/fetchWithJwt';
import { apiBase } from '../uri';

export const useJwt = () => {
	const syncing = useRef(false);
	const [storedJwt, setStoredJwt] = useLocalStorage('jwt', '');
	const [jwt, setJwt] = useState<string>('');

	const loggingOut = useRef(false);
	const logout = useCallback(() => {
		loggingOut.current = true;
		setStoredJwt('');
		setJwt('');
		navigate('/login');
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
				const response = await fetchWithJwt(`${apiBase}/token/refresh`).then(
					(res) => res.json(),
				);
				if (response.jwt && typeof response.jwt === 'string') {
					setJwt(response.jwt);
				}
			} catch (error) {
				console.error(error);
			}
			syncing.current = false;
		}
	}, [jwt, setJwt]);

	const checkToken = useCallback(async () => {
		if (!syncing.current && jwt) {
			const response = await fetchWithJwt(`${apiBase}/token`);
			if (!syncing.current && response.status !== 200) {
				await sync();
			}
		}
	}, [jwt, sync]);

	useEffect(() => {
		checkToken();
	}, [checkToken]);

	return { checkToken, jwt, setJwt, logout };
};
