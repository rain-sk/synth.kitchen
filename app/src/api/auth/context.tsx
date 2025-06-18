import React, { PropsWithChildren, useCallback, useMemo, useRef } from 'react';
import { useJwt } from './useJwt';
import { useUser } from './useUser';

const apiHost = import.meta.env.API_HOST || 'http://localhost:3000';

type AuthContextValue = {
	loading: boolean;
	user?: { email: string };
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	requestResetPassword: (email: string) => Promise<Response>;
	resetPassword: (key: string, password: string) => void;
};

const defaultContextValue: AuthContextValue = {
	loading: true,
	login: async () => {},
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
					const response = await fetch(`${apiHost}/user/login`, {
						method: 'post',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email,
							password,
						}),
					}).then((res) => res.json());
					setJwt(response.jwt || '');
				} catch (e) {
					console.error(e);
				}
				loginRef.current = false;
			}
		},
		[setJwt],
	);

	const requestResetPassword = useCallback(
		(email: string) =>
			fetch(`${apiHost}/user/reset-password-request`, {
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
		async (password: string, key: string) =>
			fetch(`${apiHost}/user/reset-password`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ password, key }),
			}),
		[],
	);

	const contextValue = useMemo(
		() => ({
			loading,
			user,
			login,
			logout,
			requestResetPassword,
			resetPassword,
		}),
		[loading, user, login, logout, requestResetPassword, resetPassword],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
