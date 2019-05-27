import * as React from 'react';
import { useFlux } from 'use-flux';
import { AuthenticationStore } from '../flux/authentication';
import { Login } from './login';
import { Register } from './register';
import { Validator } from './validator';

export const UserUi: React.FunctionComponent = () => {
	const { authenticated, token, isLoggingIn, isRegistering, checkLocalstorage } = useFlux(AuthenticationStore, ({ state, dispatch }) => ({
		authenticated: state.authenticated,
		token: state.token,
		isLoggingIn: state.isLoggingIn,
		isRegistering: state.isRegistering,
		checkLocalstorage: () => {
			dispatch({ type: 'CHECK_LOCALSTORAGE' });
		}
	}));

	React.useEffect(() => {
		checkLocalstorage();
	}, []);

	console.log(isRegistering);

	if (isLoggingIn) {
		return <Login />;
	}
	if (isRegistering) {
		return <Register />
	}
	if (token && !authenticated) {
		return <Validator />;
	}
	return null;
}
