import { useContext } from 'react';

import { AuthContext } from '../../api/auth/context';
import { Redirect } from 'wouter';

export const AccountRoute: React.FC = () => {
	const { user, loading } = useContext(AuthContext);
	return (
		<>
			{user || loading ? (
				<section>
					<h2>account</h2>

					<article>
						<h3>your info</h3>

						<p>Email: {user?.email}</p>
						<p>Verified: {user?.verified ? 'verified' : 'not verified'}</p>
					</article>
				</section>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
