import { useLocalStorage } from 'react-use';
import { useCallback, useEffect, useRef, useState } from 'react';
import { navigate } from 'wouter/use-browser-location';

import { fetchWithJwt } from '../../lib/shared/utils';
import { apiBase } from '../uri';

export const useJwt = () => {
	const syncing = useRef(false);
	const [jwt, setJwt] = useLocalStorage<string | undefined>('jwt', undefined);

	const logout = useCallback(() => {
		setJwt(undefined);
		navigate('/login');
	}, [setJwt]);

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
