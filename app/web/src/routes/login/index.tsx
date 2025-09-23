import { Link } from 'wouter';
import { Redirect } from 'wouter';
import { useSearchParams } from 'wouter';
import { navigate } from 'wouter/use-browser-location';
import { usePathname } from 'wouter/use-browser-location';
import { AuthContext } from '../../api/auth/context';
import { useEffectOnce } from '../../lib/patch/components/module/use-effect-once';
import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';

const validate = (email: string, password: string): string | undefined => {
	email + password;
	return undefined;
};

export const LoginRoute: React.FC = () => {
	const { user, login, register } = useContext(AuthContext);
	const [searchParams] = useSearchParams();
	const path = usePathname();
	const registration = useMemo(() => {
		return path.includes('register');
	}, [path]);

	const [redirect, setRedirect] = useState<string | null>(null);
	useEffectOnce(() => {
		setRedirect(searchParams.get('redirect'));
	});

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

	const [confirmPassword, setConfirmPassword] = useState('');
	const handleChangeConfirmPassword = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			setConfirmPassword(e.target.value);
		},
		[],
	);

	const [error, setError] = useState<string | undefined>();

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			let error = validate(email.trim(), password);
			if (email && password && !error) {
				setFormSubmitted(true);
				if (registration) {
					try {
						if (password !== confirmPassword) {
							error = 'Passwords do not match.';
						} else if (await register(email.trim(), password)) {
							navigate('/dashboard');
						}
					} catch (e) {
						console.error(e);
						error = 'Registration failed, please try again.';
					}
				} else {
					try {
						if (await login(email.trim(), password)) {
							navigate('/register', { replace: true });
						}
					} catch (e) {
						console.error(e);
						error = 'Login failed, please try again.';
					}
				}
				setFormSubmitted(false);
			}
			setError(error);
		},
		[registration, email, password, confirmPassword],
	);

	return user ? (
		redirect ? (
			<Redirect to={redirect} />
		) : (
			<Redirect to="/account" />
		)
	) : (
		<main>
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
				{registration && (
					<>
						<label htmlFor="confirm-password">confirm password</label>
						<input
							id="confirm-password"
							type="password"
							value={confirmPassword}
							onChange={handleChangeConfirmPassword}
						/>
					</>
				)}
				{error ? <p id="email-error">{error}</p> : null}
				<button disabled={formSubmitted ? true : false}>
					{registration ? 'register' : 'login'}
				</button>
			</form>
			<p>
				<Link to="/reset-password">forgot password</Link>
			</p>
		</main>
	);
};
