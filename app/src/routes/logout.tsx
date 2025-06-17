import { useContext, useEffect } from 'react';
import { AuthContext } from '../api/auth/context';

export const LogoutRoute = () => {
	const { logout } = useContext(AuthContext);
	useEffect(() => {
		logout();
	}, [logout]);
	return null;
};
