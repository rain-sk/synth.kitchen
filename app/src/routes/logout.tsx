import { useContext, useEffect } from 'react';
import { AuthContext } from '../api/auth/context';
import { navigate } from 'wouter/use-browser-location';

export const LogoutRoute = () => {
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		logout();
		navigate('/login');
	}, [logout]);

	return null;
};
