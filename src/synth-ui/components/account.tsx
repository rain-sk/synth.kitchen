import * as React from 'react';
import { useFlux } from 'use-flux';
import { AuthenticationStore } from '../flux/authentication';

export const Account: React.FunctionComponent = () => {
	const { authenticated, openLogin, openRegister, logout } = useFlux(AuthenticationStore, ({ state, dispatch }) => ({
		authenticated: state.authenticated,
		openLogin: () => {
			dispatch({ type: 'OPEN_LOGIN' });
		},
		openRegister: () => {
			dispatch({ type: 'OPEN_REGISTER' });
		},
		logout: () => {
			dispatch({ type: 'LOGOUT' });
		}
	}));
	return (
		<nav>
			{authenticated ?
				<button type="button" onClick={logout}>logout</button>
				:
				<>
					<button type="button" onClick={openLogin}>login</button>
					<button type="button" onClick={openRegister}>register</button>
				</>
			}
		</nav>
	)
}