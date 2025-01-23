import { useCallback, useRef, useState } from 'react';
import { useUserContext } from 'supertokens-auth-react';
import EmailPassword, {
	doesEmailExist,
	signIn,
	signUp,
} from 'supertokens-auth-react/recipe/emailpassword';
import Session, {
	useSessionContext,
} from 'supertokens-auth-react/recipe/session';

export const SuperTokensConfig = {
	appInfo: {
		appName: 'SuperTokens Demo App',
		apiDomain: 'http://localhost/api',
		websiteDomain: 'http://localhost',
	},
	// recipeList contains all the modules that you want to
	// use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
	recipeList: [EmailPassword.init(), Session.init()],
	getRedirectionURL: async (context: any) => {
		if (context.action === 'SUCCESS' && context.newSessionCreated) {
			return '/dashboard';
		}
	},
};

export const Auth = () => {
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
	const onSubmit = useCallback(async () => {
		if (submittingRef.current) {
			return;
		}
		submittingRef.current = true;
		setSubmitting(true);

		const { doesExist } = await doesEmailExist({ email, userContext });
		console.log(doesExist);

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

		submittingRef.current = false;
		setSubmitting(false);
	}, [email, password, setEmail, setPassword, userContext, setSubmitting]);

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
