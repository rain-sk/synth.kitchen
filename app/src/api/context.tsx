import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { useJwt } from './useJwt';
import { useUser } from './useUser';

const apiHost = import.meta.env.API_HOST || 'http://localhost:3000';

type ApiContextValue = {
	user?: { email: string };
	login: (email: string, password: string) => Promise<void>;
	requestResetPassword: (email: string) => Promise<Response>;
	resetPassword: (key: string, password: string) => void;
};

const defaultContextValue: ApiContextValue = {
	login: async () => {},
	requestResetPassword: async () => ({} as Response),
	resetPassword: async () => ({} as Response),
};

export const ApiContext =
	React.createContext<ApiContextValue>(defaultContextValue);

export const ApiContextProvider: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const [jwt, setJwt] = useJwt();
	const user = useUser(jwt);

	const login = useCallback(async (email: string, password: string) => {
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
		console.log(response);
		setJwt(response.jwt || '');
	}, []);

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
			user,
			login,
			requestResetPassword,
			resetPassword,
		}),
		[user, login, requestResetPassword, resetPassword],
	);

	return (
		<ApiContext.Provider value={contextValue}>{children}</ApiContext.Provider>
	);
};
