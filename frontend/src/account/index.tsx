import { useCallback, useRef, useState } from 'react';
import { useUserContext } from 'supertokens-auth-react';
import {
	doesEmailExist,
	signIn,
	signUp,
} from 'supertokens-auth-react/recipe/emailpassword';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

export const Account = () => {
	const session = useSessionContext();
	const userContext = useUserContext();
	console.log(userContext);

	if (session.loading) {
		return null;
	}

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

			const { doesExist } = await doesEmailExist({ email, userContext });
			try {
				const result = doesExist
					? await signIn({
							formFields: [
								{ id: 'email', value: email },
								{ id: 'password', value: password },
							],
							userContext,
					  })
					: await signUp({
							formFields: [
								{ id: 'email', value: email },
								{ id: 'password', value: password },
							],
							userContext,
					  });
				console.log(result);
			} catch (e) {
				console.error(e);
				submittingRef.current = false;
				setSubmitting(false);
			}
		},
		[email, password, setEmail, setPassword, userContext, setSubmitting],
	);

	return (
		<main>
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
		</main>
	);
};
