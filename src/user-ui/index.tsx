import * as React from 'react';
import { useFlux } from 'use-flux';
import { AuthenticationStore } from './flux/authentication';
import { Login } from './login';
import { Validator } from './validator';

export const UserUi: React.FunctionComponent = () => {
	const { state, checkLocalstorage } = useFlux(AuthenticationStore, ({ state, dispatch }) => ({
		state,
		checkLocalstorage: () => {
			dispatch({ type: 'CHECK_LOCALSTORAGE' });
		}
	}));

	React.useEffect(() => {
		checkLocalstorage();
	}, []);

	if (state.isLoggingIn) {
		return <Login />;
	} else {
		if (state.token && !state.authenticated) {
			return <Validator />
		}
	}
	return <Login />;
}