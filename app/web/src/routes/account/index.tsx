import { useContext } from 'react';
import { Redirect } from 'wouter';

import { AuthContext } from '../../api/auth/context';

export const AccountRoute: React.FC = () => {
	const { user, loading } = useContext(AuthContext);
	return (
		<>
			{user || loading ? (
				<main>
					<h2>account</h2>

					<article>
						<h3>your info</h3>

						<p>Email: {user?.email}</p>
						<p>Verified: {user?.verified ? 'verified' : 'not verified'}</p>
					</article>
				</main>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
