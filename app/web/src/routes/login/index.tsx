import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { useTitle } from 'react-use';
import { Link, Redirect, useSearchParams } from 'wouter';
import { navigate, usePathname } from 'wouter/use-browser-location';

import { AuthContext } from '../../api/auth/context';
import { Loader } from '../../lib/shared/components/loader';
import { useEffectOnce } from '../../lib/patch/components/module/use-effect-once';

import './styles.css';

type FormErrors = {
	email: string[];
	username: string[];
	password: string[];
	confirmPassword: string[];
	form: string[];
};

export const LoginRoute: React.FC = () => {
	const { user, login, register, loading } = useContext(AuthContext);
	const [searchParams] = useSearchParams();
	const path = usePathname();
	const registration = useMemo(() => {
		return path.includes('register');
	}, [path]);
	useTitle(registration ? 'synth.kitchen | register' : 'synth.kitchen | login');

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

	const [errors, setErrors] = useState<FormErrors>({
		email: [],
		username: [],
		password: [],
		confirmPassword: [],
		form: [],
	});

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (email && password) {
				setFormSubmitted(true);
				if (registration) {
					try {
						if (password !== confirmPassword) {
							setErrors({
								email: [],
								username: [],
								password: [],
								confirmPassword: ['Passwords do not match.'],
								form: [],
							});
						} else {
							const registerResponse = await register(email.trim(), password);
							if (registerResponse) {
								if ('jwt' in registerResponse) {
									navigate('/');
								} else if ('errors' in registerResponse) {
									console.log(registerResponse.errors);
									setErrors(registerResponse.errors);
								}
							}
						}
					} catch (e) {
						console.error(e);
						setErrors({
							email: [],
							username: [],
							password: [],
							confirmPassword: [],
							form: ['Registration failed, please try again.'],
						});
					}
				} else {
					try {
						if (await login(email.trim(), password)) {
							navigate('/register', { replace: true });
						}
					} catch (e) {
						console.error(e);
						setErrors({
							email: [],
							username: [],
							password: [],
							confirmPassword: [],
							form: ['Login failed, please try again.'],
						});
					}
				}
				setFormSubmitted(false);
			}
		},
		[registration, email, password, confirmPassword],
	);

	const errorsCount = Object.values(errors)
		.map((array) => array.length)
		.reduce((collector, value) => collector + value);

	const showFormErrors = errors.form.length > 0;
	const showSpecificErrors = errorsCount > errors.form.length;

	return loading ? (
		<Loader />
	) : user ? (
		redirect ? (
			<Redirect to={redirect} />
		) : (
			<Redirect to="/dashboard" />
		)
	) : (
		<main>
			<section>
				<h2>{registration ? 'register' : 'login'}</h2>
				<form onSubmit={handleSubmit}>
					{errorsCount > 0 && (
						<section
							tabIndex={0}
							ref={(errorsSection) => errorsSection?.focus()}
						>
							<p>
								There{' '}
								{errorsCount > 1 ? (
									<>are {errorsCount} errors</>
								) : (
									<>is an error</>
								)}
								.
							</p>
							{showFormErrors && (
								<ul>
									{errors.form.map((error) => (
										<li key={error}>{error}</li>
									))}
								</ul>
							)}
							{showSpecificErrors && (
								<ol>
									{errors.email.map((error) => (
										<li key={error}>
											<a href="#email">{error}</a>
										</li>
									))}
									{errors.username.map((error) => (
										<li key={error}>
											<a href="#username">{error}</a>
										</li>
									))}
									{errors.password.map((error) => (
										<li key={error}>
											<a href="#password">{error}</a>
										</li>
									))}
									{errors.confirmPassword.map((error) => (
										<li key={error}>
											<a href="#confirm-password">{error}</a>
										</li>
									))}
								</ol>
							)}
						</section>
					)}
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
					<button id="submit" disabled={formSubmitted ? true : false}>
						{registration ? 'register' : 'login'}
					</button>
				</form>
				<p>
					<Link to="/reset-password">forgot password</Link>
				</p>
			</section>
		</main>
	);
};
