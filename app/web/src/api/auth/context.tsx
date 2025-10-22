import React, { PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import type {
	LoginResponse,
	RegisterResponse,
	UserInfoAuthenticated,
} from 'synth.kitchen-shared';

import { apiBase } from '../uri';
import { useJwt } from './useJwt';
import { useUser } from './useUser';
import { navigate } from 'wouter/use-browser-location';
import { fetchWithJwt } from '../../lib/shared/utils';

type AuthContextValue = {
	loading: boolean;
	user?: UserInfoAuthenticated;
	login: (email: string, password: string) => Promise<true | void>;
	register: (email: string, password: string) => Promise<true | void>;
	logout: () => void;
	deleteUser: (password: string) => Promise<true | void>;
	requestResetPassword: (email: string) => Promise<Response>;
	resetPassword: (key: string, password: string) => Promise<Response>;
};

const defaultContextValue: AuthContextValue = {
	loading: true,
	login: async () => {},
	register: async () => {},
	logout: () => {},
	deleteUser: async () => {},
	requestResetPassword: async () => ({} as Response),
	resetPassword: async () => ({} as Response),
};

export const AuthContext =
	React.createContext<AuthContextValue>(defaultContextValue);

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
			if (registerRef.current) {
				return;
			}
			registerRef.current = true;
			try {
				const headers = {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				};
				const response = await fetch(`${apiBase}/auth/register`, {
					headers,
					method: 'post',
					body: JSON.stringify({
						email,
						password,
					}),
				}).then(async (res) => {
					if (res.status === 200) {
						registerRef.current = false;
						return (await res.json()) as RegisterResponse;
					} else if (res.status === 400) {
						const { errors } = await res.json();
						if (
							'email' in errors &&
							Array.isArray(errors.email) &&
							errors.email.some(
								(error: string) => error === 'Email is already in use.',
							)
						) {
							registerRef.current = false;
							return { login: true };
						}
					} else {
						throw new Error(await res.text());
					}
				});
				setJwt(response && 'jwt' in response ? response.jwt : undefined);
			} catch (e) {
				console.error(e);
			}
			registerRef.current = false;
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
				setJwt(undefined);
				navigate('/');
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

	const contextValue = useMemo<AuthContextValue>(
		() => ({
			loading,
			user,
			login,
			register,
			logout,
			deleteUser,
			requestResetPassword,
			resetPassword,
		}),
		[
			loading,
			user,
			login,
			register,
			logout,
			deleteUser,
			requestResetPassword,
			resetPassword,
		],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
