import React, { PropsWithChildren, useCallback, useRef } from 'react';
import { useJwt } from './useJwt';
import { useUser } from './useUser';
import { LoginResponse, RegisterResponse } from 'synth.kitchen-shared';
import { apiBase } from '../uri';
import { fetchWithJwt } from '../../lib/shared/utils';
import { navigate } from 'wouter/use-hash-location';
import { AuthContext } from './context';

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const { jwt, setJwt, logout } = useJwt();
	const { user, loading } = useUser(jwt);

	const loginRef = useRef(false);
	const login = useCallback(
		async (email: string, password: string) => {
			if (loginRef.current) {
				return;
			}

			loginRef.current = true;
			try {
				const headers = {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				};
				const response: LoginResponse = await fetch(`${apiBase}/auth/login`, {
					headers,
					method: 'post',
					body: JSON.stringify({
						email,
						password,
					}),
				}).then(async (res) => {
					if (res.status === 200) {
						return (await res.json()) as LoginResponse;
					} else if (res.status === 404) {
						return {
							register: true,
						} as LoginResponse;
					} else {
						throw new Error(await res.text());
					}
				});
				setJwt(response.jwt);
				if (response.register) {
					loginRef.current = false;
					return response.register;
				}
			} catch (e) {
				console.error(e);
			}
			loginRef.current = false;
		},
		[setJwt],
	);

	const registerRef = useRef(false);
	const register = useCallback(
		async (email: string, password: string) => {
			let response: RegisterResponse | undefined;
			if (registerRef.current) {
				return;
			}
			registerRef.current = true;
			try {
				const headers = {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				};
				response = await fetch(`${apiBase}/auth/register`, {
					headers,
					method: 'post',
					body: JSON.stringify({
						email,
						password,
					}),
				}).then(async (res) => {
					if (res.status === 200 || res.status === 400) {
						registerRef.current = false;
						return (await res.json()) as RegisterResponse;
					} else {
						throw new Error(await res.text());
					}
				});
				setJwt(response && 'jwt' in response ? response.jwt : undefined);
			} catch (e) {
				console.error(e);
			}
			registerRef.current = false;
			return response;
		},
		[setJwt],
	);

	const deleteRef = useRef(false);
	const deleteUser = useCallback(async (password: string) => {
		if (deleteRef.current) {
			return;
		}
		deleteRef.current = true;

		try {
			const headers = {
				Accept: 'application/json',
				'x-password': password,
			};
			const response = await fetchWithJwt(`${apiBase}/auth/user`, {
				headers,
				method: 'delete',
			}).then(async (res) => res.json());

			if (response.success) {
				navigate('/logout');
			} else {
				location.reload();
			}
		} catch (error) {
			console.error(error);
		}

		deleteRef.current = false;
	}, []);

	const requestResetPassword = useCallback(
		(email: string) =>
			fetch(`${apiBase}/auth/reset-password-request`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
				}),
			}),
		[jwt],
	);

	const resetPassword = useCallback(
		async (password: string, resetKey: string) =>
			fetch(`${apiBase}/auth/reset-password`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password, resetKey }),
			}),
		[],
	);

	const verifyAccount = useCallback(
		async (key: string) =>
			await fetch(`${apiBase}/auth/verify/${key}`, {
				method: 'get',
			}),
		[],
	);

	return (
		<AuthContext.Provider
			value={{
				loading,
				user,
				login,
				register,
				logout,
				deleteUser,
				requestResetPassword,
				resetPassword,
				verifyAccount,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
