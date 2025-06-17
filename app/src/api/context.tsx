import React, {
	PropsWithChildren,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';

type ApiContextValue = {
	user?: { email: string };
	login: (email: string, password: string) => Promise<Response>;
	requestResetPassword: (email: string) => Promise<Response>;
	resetPassword: (key: string, password: string) => void;
};

const defaultContextValue: ApiContextValue = {
	login: async () => ({} as Response),
	requestResetPassword: async () => ({} as Response),
	resetPassword: async () => ({} as Response),
};

export const ApiContext =
	React.createContext<ApiContextValue>(defaultContextValue);

type ApiContextProps = {
	url: string;
};

export const ApiContextProvider: React.FC<
	PropsWithChildren<ApiContextProps>
> = ({ url, children }) => {
	const [jwt, setJwt] = useState('');
	const [user] = useState<{ email: string } | undefined>();

	useEffect(() => {
		if (!jwt) {
			const storedJwt = localStorage.getItem('jwt');
			if (storedJwt) {
				setJwt(storedJwt);
			}
		} else {
			if (jwt !== localStorage.getItem('jwt')) {
				localStorage.setItem('jwt', jwt);
			}
		}
	}, [jwt]);

	const login = useCallback(
		(email: string, password: string) =>
			fetch(`${url}/user/login`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			}),
		[],
	);

	const requestResetPassword = useCallback(
		(email: string) =>
			fetch(`${url}/user/reset-password-request`, {
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
			fetch(`${url}/user/reset-password`, {
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
