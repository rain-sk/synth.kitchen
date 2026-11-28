import React from 'react';
import type {
	CodeRequestResponse,
	VerifyCodeResponse,
	UserInfoAuthenticated,
} from 'synth.kitchen-shared';

type AuthContextValue = {
	loading: boolean;
	user?: UserInfoAuthenticated;
	requestCode: (
		email: string,
		captchaToken?: string,
	) => Promise<CodeRequestResponse | void>;
	verifyCode: (
		email: string,
		code: string,
	) => Promise<VerifyCodeResponse | void>;
	logout: () => void;
	deleteUser: () => Promise<true | void>;
};

const defaultContextValue: AuthContextValue = {
	loading: true,
	requestCode: async () => {},
	verifyCode: async () => {},
	logout: () => {},
	deleteUser: async () => {},
};

export const AuthContext =
	React.createContext<AuthContextValue>(defaultContextValue);
