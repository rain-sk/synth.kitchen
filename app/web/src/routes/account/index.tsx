import { useCallback, useContext, useState } from 'react';
import { useTitle } from 'react-use';
import { Redirect } from 'wouter';

import { AuthContext } from '../../api/auth/context';
import { Loader } from '../../lib/shared/components/loader';

export const AccountRoute: React.FC = () => {
	useTitle('synth.kitchen | account');
	const { user, loading, deleteUser } = useContext(AuthContext);

	const [confirmDelete, setConfirmDelete] = useState(false);

	const onSubmitDeleteAccount = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (!confirmDelete) {
				return;
			}

			await deleteUser();
		},
		[confirmDelete, deleteUser],
	);

	return (
		<>
			{loading ? (
				<Loader />
			) : user ? (
				<main>
					<h2>account</h2>

					<article>
						<h3>your info</h3>

						<p>Email: {user.email}</p>
						<p>{user.verified ? 'Verified' : 'Not verified'}</p>
					</article>
					<article>
						<h3>settings</h3>

						{confirmDelete ? (
							<form onSubmit={onSubmitDeleteAccount}>
								<h4>Delete your account?</h4>
								<button id="confirm-delete">Confirm deletion</button>
								<button id="cancel-delete" type="button" onClick={() => setConfirmDelete(false)}>
									keep my account
								</button>
							</form>
						) : (
							<label>
								Delete your account{' '}
								<input
									id="delete"
									type="button"
									value="delete"
									onClick={() => setConfirmDelete(true)}
								></input>
							</label>
						)}
					</article>
				</main>
			) : (
				<Redirect to="/login" />
			)}
		</>
	);
};
