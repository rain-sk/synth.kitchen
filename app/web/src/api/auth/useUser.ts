import { useEffect, useRef, useState } from 'react';
import type { AdminUser, UserInfoAuthenticated } from 'synth.kitchen-shared';

import { apiBase } from '../uri';

export const useUser = (jwt: string) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState<
		UserInfoAuthenticated | AdminUser | undefined
	>();

	const blockingRef = useRef(false);
	useEffect(() => {
		(async () => {
			if (jwt && !user && !blockingRef.current) {
				try {
					blockingRef.current = true;
					setLoading(blockingRef.current);

					const user = await fetch(`${apiBase}/auth/user`, {
						headers: {
							authorization: `Bearer ${jwt}`,
							Accept: 'application/json',
						},
					})
						.then((res) => res.json())
						.then((response) => response.user as UserInfoAuthenticated);
					setUser(user);
				} catch (e) {
					console.error(e);
					setUser(undefined);
				} finally {
					blockingRef.current = false;
					setLoading(blockingRef.current);
				}
			}
		})();
	}, [jwt, user]);

	const timeoutRef = useRef<any>(undefined);
	useEffect(() => {
		if (loading) {
			if (!jwt) {
				timeoutRef.current = setTimeout(() => {
					setLoading(false);
				}, 100);
			} else if (timeoutRef.current !== undefined) {
				clearTimeout(timeoutRef.current);
			}
		}
	}, [jwt, loading]);

	return { user, loading };
};
