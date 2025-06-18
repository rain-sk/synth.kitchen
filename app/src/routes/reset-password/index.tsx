import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useState,
} from 'react';
import { useRoute } from 'wouter';
import { navigate } from 'wouter/use-browser-location';

import { AuthContext } from '../../api/auth/context';

const validatePassword = (password: string, passwordDuplicate: string) => {
	if (password !== passwordDuplicate) return 'Passwords do not match.';
	if (password.length < 4) return 'Password must be at least four characters';
	return undefined;
};

const NewPasswordForm: React.FC<{ requestKey: string }> = ({ requestKey }) => {
	const { resetPassword } = useContext(AuthContext);

	const [password, setPassword] = useState('');
	const handleChangePassword = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value);
		},
		[],
	);

	const [passwordDuplicate, setPasswordDuplicate] = useState('');
	const handleChangePasswordDuplicate = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setPasswordDuplicate(e.target.value);
		},
		[],
	);

	const [error, setError] = useState<string | undefined>();

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const error = validatePassword(password, passwordDuplicate);
			if (!error) {
				await resetPassword(password, requestKey);
				navigate('/login');
			}
			setError(error);
		},
		[requestKey, password, passwordDuplicate],
	);

	return (
		<section>
			<h2>set your new password</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="password">new password</label>
				<input
					id="password"
					type="password"
					onChange={handleChangePassword}
					aria-describedby={error ? 'password-error' : ''}
				/>
				<label htmlFor="password-duplicate">repeat your new password</label>
				{error ? <p id="password-error">{error}</p> : null}
				<input
					id="password-duplicate"
					type="password"
					onChange={handleChangePasswordDuplicate}
				/>
				<button>submit</button>
			</form>
		</section>
	);
};
function validateEmail(email: string) {
	var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!re.test(email)) return 'Invalid email';
	return undefined;
}

const RequestPasswordResetLink: React.FC = () => {
	const { requestResetPassword } = useContext(AuthContext);

	const [formSubmitted, setFormSubmitted] = useState(false);

	const [email, setEmail] = useState('');
	const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);

	const [error, setError] = useState<string | undefined>();

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const error = validateEmail(email.trim());
			if (email && !error) {
				setFormSubmitted(true);
				await requestResetPassword(email.trim());
				navigate('/login');
			}
			setError(error);
		},
		[email],
	);

	return (
		<section>
			<h2>request a password-reset link</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">email address</label>
				<input
					id="email"
					type="email"
					onChange={handleChangeEmail}
					aria-describedby={error ? 'email-error' : ''}
				/>
				{error ? <p id="email-error">{error}</p> : null}
				<button disabled={formSubmitted ? true : false}>submit</button>
			</form>
		</section>
	);
};

export const ResetPasswordRoute = () => {
	const [match, params] = useRoute('/reset-password/:key');

	if (match && params?.key) {
		return <NewPasswordForm requestKey={params.key} />;
	} else {
		return <RequestPasswordResetLink />;
	}
};
