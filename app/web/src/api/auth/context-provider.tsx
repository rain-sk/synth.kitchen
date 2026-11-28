import React, { PropsWithChildren, useCallback, useRef } from 'react';
import { CodeRequestResponse } from 'synth.kitchen-shared';

import { AuthContext } from './context';
import { useJwt } from './useJwt';
import { useUser } from './useUser';
import { apiBase } from '../uri';
import { fetchWithJwt } from '../../lib/shared/utils';

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { jwt, setJwt, logout } = useJwt();
	const { user, loading } = useUser(jwt);

	const requestCodeRef = useRef(false);
	const requestCode = useCallback(
		async (email: string, captchaToken?: string) => {
			if (requestCodeRef.current) {
				return;
			}
			requestCodeRef.current = true;
			try {
				const response = await fetch(`${apiBase}/auth/request-code`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'post',
					body: JSON.stringify({
						email,
						captchaToken,
					}),
				});

				if (response.status === 200) {
					return (await response.json()) as CodeRequestResponse;
				}
				const body = (await response.json().catch(() => undefined)) as
					| { error?: string }
					| undefined;
				return { success: false, message: body?.error ?? 'Request failed.' } as CodeRequestResponse;
			} catch (e) {
				console.error(e);
			} finally {
				requestCodeRef.current = false;
			}
		},
		[],
	);

	const verifyCode = useCallback(
		async (email: string, code: string) => {
			try {
				const response = await fetch(`${apiBase}/auth/verify-code`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					method: 'post',
					body: JSON.stringify({ email, code }),
				});

				if (response.status === 200) {
					const data = (await response.json()) as { jwt?: string };
					if (data.jwt) {
						setJwt(data.jwt);
						return { jwt: data.jwt };
					}
					return;
				}

				const body = (await response.json().catch(() => undefined)) as
					| { error?: string }
					| undefined;
				return { error: body?.error ?? 'Something went wrong, try again.' };
			} catch (e) {
				console.error(e);
			}
		},
		[setJwt],
	);

	const deleteRef = useRef(false);
	const deleteUser = useCallback(async () => {
		if (deleteRef.current) {
			return;
		}
		deleteRef.current = true;
		try {
			const response = await fetchWithJwt(`${apiBase}/auth/user`, {
				method: 'delete',
			}).then(async (res) => res.json());

			if (response.success) {
				location.reload();
			}
		} catch (error) {
			console.error(error);
		}

		deleteRef.current = false;
	}, []);

	return (
		<AuthContext.Provider
			value={{
				loading,
				user,
				requestCode,
				verifyCode,
				logout,
				deleteUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
