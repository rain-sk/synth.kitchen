import { useContext } from 'react';
import { AuthContext } from '../auth/context';

export const Account = () => {
	const { session, user } = useContext(AuthContext);

	return session.loading || !user ? null : (
		<main>
			<h1>{user.emails[0]}</h1>
		</main>
	);
};
