import React from 'react';
import type {
	LoginResponse,
	RegisterResponse,
	UserInfoAuthenticated,
} from 'synth.kitchen-shared';

type AuthContextValue = {
	loading: boolean;
	user?: UserInfoAuthenticated;
	login: (email: string, password: string) => Promise<LoginResponse | void>;
	register: (
		email: string,
		password: string,
	) => Promise<RegisterResponse | void>;
	logout: () => void;
	deleteUser: (password: string) => Promise<true | void>;
	requestResetPassword: (email: string) => Promise<Response>;
	resetPassword: (key: string, password: string) => Promise<Response>;
	verifyAccount: (key: string) => Promise<Response>;
};

const defaultContextValue: AuthContextValue = {
	loading: true,
	login: async () => {},
	register: async () => {},
	logout: () => {},
	deleteUser: async () => {},
	requestResetPassword: async () => ({}) as Response,
	resetPassword: async () => ({}) as Response,
	verifyAccount: async () => ({}) as Response,
};

export const AuthContext =
	React.createContext<AuthContextValue>(defaultContextValue);
