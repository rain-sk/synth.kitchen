import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useState,
} from 'react';
// import { navigate } from 'wouter/use-browser-location';

import { ApiContext } from '../api/context';

const validate = (email: string, password: string): string | undefined => {
	email + password;
	return undefined;
};

export const LoginRoute: React.FC = () => {
	const { login } = useContext(ApiContext);

	const [formSubmitted, setFormSubmitted] = useState(false);

	const [email, setEmail] = useState('');
	const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);

	const [password, setPassword] = useState('');
	const handleChangePassword = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value);
		},
		[],
	);

	const [error, setError] = useState<string | undefined>();

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const error = validate(email.trim(), password);
			if (email && !error) {
				setFormSubmitted(true);
				const response = await login(email.trim(), password);
				console.log(response);
			}
			setError(error);
		},
		[email, password],
	);

	return (
		<section>
			<h2>login</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">email address</label>
				<input
					id="email"
					type="email"
					value={email}
					onChange={handleChangeEmail}
				/>
				<label htmlFor="password">password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={handleChangePassword}
				/>
				{error ? <p id="email-error">{error}</p> : null}
				<button disabled={formSubmitted ? true : false}>login</button>
			</form>
		</section>
	);
};
