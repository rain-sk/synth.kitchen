import { useCallback, useContext, useRef, useState } from 'react';
import {
	doesEmailExist,
	signIn,
	signUp,
} from 'supertokens-auth-react/recipe/emailpassword';
import { AuthContext } from './context';

export const AuthForm = () => {
	const { session, setOpenAuthModal } = useContext(AuthContext);

	const [email, setEmail] = useState('');
	const onChangeEmail = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
		},
		[setEmail],
	);

	const [password, setPassword] = useState('');
	const onChangePassword = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value);
		},
		[setPassword],
	);

	const [submitting, setSubmitting] = useState(false);
	const submittingRef = useRef(submitting);
	const onSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			if (submittingRef.current) {
				return;
			}
			submittingRef.current = true;
			setSubmitting(true);

			const { doesExist } = await doesEmailExist({ email });
			try {
				const result = doesExist
					? await signIn({
							formFields: [
								{ id: 'email', value: email },
								{ id: 'password', value: password },
							],
					  })
					: await signUp({
							formFields: [
								{ id: 'email', value: email },
								{ id: 'password', value: password },
							],
					  });
				if (result.status === 'OK') {
					setOpenAuthModal(false);
				}
			} catch (e) {
				console.error(e);
				submittingRef.current = false;
				setSubmitting(false);
			}
		},
		[email, password, setEmail, setPassword, setSubmitting],
	);

	return session.loading ? null : (
		<form onSubmit={onSubmit}>
			<label htmlFor="email">Email</label>
			<input id="email" type="email" value={email} onChange={onChangeEmail} />

			<label htmlFor="password">Password</label>
			<input
				id="password"
				type="password"
				value={password}
				onChange={onChangePassword}
			/>

			<button type="submit" disabled={submitting}>
				log in
			</button>
		</form>
	);
};
