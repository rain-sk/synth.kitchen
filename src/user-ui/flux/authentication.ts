import { createFlux, BaseState } from 'use-flux';

export type AuthenticationAction = 'CHECK_LOCALSTORAGE' | 'STORE_TOKEN' | 'VALIDATE_TOKEN' | 'CLEAR_TOKEN';

export interface IAuthenticationResponse {
	token: string;
	user_display_name: string;
	user_email: string;
	user_nicename: string;
}

export interface IValidationResponse {
	code: string;
	data: {
		status: number;
	};
}

export interface IAuthenticationState extends BaseState<AuthenticationAction> {
	authenticated: boolean;
	isLoggingIn?: boolean;
	user_display_name?: string;
	token?: string;
}

export const [reducers, AuthenticationStore, AuthenticationProvider] = createFlux<AuthenticationAction, IAuthenticationState>({ authenticated: false, isLoggingIn: true });

const SYNTH_KITCHEN_LOCALSTORAGE_KEY = 'SK_auth__'

reducers.set('CHECK_LOCALSTORAGE', (state) => {
	if (localStorage) {
		const stringValue = localStorage.getItem(SYNTH_KITCHEN_LOCALSTORAGE_KEY);
		if (stringValue) {
			const storedValue = JSON.parse(stringValue) as IAuthenticationResponse;
			return {
				...state,
				user_display_name: storedValue.user_display_name,
				token: storedValue.token
			}
		}
	}
	return state;
});

reducers.set('STORE_TOKEN', (state, payload: IAuthenticationResponse) => {
	if (localStorage) {
		localStorage.setItem(SYNTH_KITCHEN_LOCALSTORAGE_KEY, JSON.stringify(payload));
		return {
			...state,
			isLoggingIn: false,
			user_display_name: payload.user_display_name,
			token: payload.token
		};
	} else {
		return state;
	}
});

reducers.set('VALIDATE_TOKEN', (state, payload: IValidationResponse) => {
	if (payload.data.status === 200) {
		return {
			...state,
			authenticated: true
		};
	} else {
		return {
			...state,
			dispatchQueue: [{ type: 'CLEAR_TOKEN' }]
		};
	}
});

reducers.set('CLEAR_TOKEN', (state) => {
	if (localStorage) {
		localStorage.removeItem(SYNTH_KITCHEN_LOCALSTORAGE_KEY);
	}
	return {
		...state,
		authenticated: false,
		user_display_name: undefined,
		token: undefined
	}
});