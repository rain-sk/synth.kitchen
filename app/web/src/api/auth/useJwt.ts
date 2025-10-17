import { useLocalStorage } from 'react-use';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navigate } from 'wouter/use-browser-location';

import { fetchWithJwt } from '../../lib/shared/utils/fetchWithJwt';
import { apiBase } from '../uri';

export const useJwt = () => {
	const syncing = useRef(false);
	const [storedJwt, setStoredJwt] = useLocalStorage<string | undefined>(
		'jwt',
		undefined,
	);
	const [jwt, setJwt] = useState<string | undefined>(undefined);

	const loggingOut = useRef(false);
	const logout = useCallback(() => {
		loggingOut.current = true;
		setStoredJwt(undefined);
		setJwt(undefined);
		navigate('/login');
	}, [setJwt, setStoredJwt]);

	useEffect(() => {
		if (loggingOut.current) {
			if (jwt === undefined && storedJwt === undefined) {
				loggingOut.current = false;
			}
		} else if (jwt !== undefined) {
			if (jwt !== storedJwt) {
				setStoredJwt(jwt);
			}
		} else if (storedJwt !== undefined) {
			setJwt(storedJwt);
		}
	}, [jwt, storedJwt]);

	const sync = useCallback(async () => {
		if (jwt !== undefined) {
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
