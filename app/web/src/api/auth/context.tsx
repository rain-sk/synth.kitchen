import React, { PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import type {
	LoginResponse,
	RegisterResponse,
	UserInfoAuthenticated,
} from 'synth.kitchen-shared';

import { useJwt } from './useJwt';
import { useUser } from './useUser';
import { apiBase } from '../uri';

type AuthContextValue = {
	loading: boolean;
	user?: UserInfoAuthenticated;
	login: (email: string, password: string) => Promise<true | void>;
	register: (email: string, password: string) => Promise<true | void>;
	logout: () => void;
	requestResetPassword: (email: string) => Promise<Response>;
	resetPassword: (key: string, password: string) => Promise<Response>;
};

const defaultContextValue: AuthContextValue = {
	loading: true,
	login: async () => {},
	register: async () => {},
	logout: () => {},
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
			if (!loginRef.current) {
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
					setJwt(response.jwt || '');
					if (response.register) {
						loginRef.current = false;
						return response.register;
					}
				} catch (e) {
					console.error(e);
				}
				loginRef.current = false;
			}
		},
		[setJwt],
	);

	const registerRef = useRef(false);
	const register = useCallback(
		async (email: string, password: string) => {
			if (!registerRef.current) {
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
						} else {
							throw new Error(await res.text());
						}
					});
					setJwt(response.jwt || '');
				} catch (e) {
					console.error(e);
				}
				registerRef.current = false;
			}
		},
		[setJwt],
	);

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
			requestResetPassword,
			resetPassword,
		}),
		[
			loading,
			user,
			login,
			register,
			logout,
			requestResetPassword,
			resetPassword,
		],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
