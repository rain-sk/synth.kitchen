import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/context';
import { Nav } from '../nav';

export const Account = () => {
	const { session, user, setOpenAuthModal } = useContext(AuthContext);

	useEffect(() => {
		if (!session.loading && !session.doesSessionExist) {
			setOpenAuthModal(true);
		}
	}, [session, setOpenAuthModal]);

	return (
		<>
			<Nav />
			<main>
				{session.loading || !user ? null : (
					<>
						<h1>{user.emails[0]}</h1>
						<section>
							<p>Hello!</p>
						</section>
					</>
				)}
			</main>
		</>
	);
};
