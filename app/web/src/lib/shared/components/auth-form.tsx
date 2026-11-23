import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';
import { Link, useLocation } from 'wouter';

import { AuthContext } from '../../../api/auth/context';
import { capEndpoint } from '../../../api/cap';
import { t } from '../../../lang';

import 'cap-widget';

export type AuthMode = 'login' | 'register';

type FormErrors = {
	email: string[];
	username: string[];
	password: string[];
	confirmPassword: string[];
	form: string[];
};

const emptyErrors = (): FormErrors => ({
	email: [],
	username: [],
	password: [],
	confirmPassword: [],
	form: [],
});

export const AuthForm: React.FC<{
	mode: AuthMode;
	onAuthenticated?: () => void;
	onRegistered?: () => void;
	hosted?: boolean;
}> = ({ mode, onAuthenticated, onRegistered, hosted = false }) => {
	const registration = mode === 'register';
	const [, navigate] = useLocation();

	const { login, register } = useContext(AuthContext);

	const [formSubmitted, setFormSubmitted] = useState(false);

	const capWidgetRef = useRef<HTMLElementTagNameMap['cap-widget'] | null>(null);

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

	const [errors, setErrors] = useState<FormErrors>(emptyErrors);

	const handleSubmit = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			if (email && password) {
				setFormSubmitted(true);
				if (registration) {
					try {
						if (password !== confirmPassword) {
							setErrors({
								...emptyErrors(),
								confirmPassword: ['Passwords do not match.'],
							});
						} else {
							const captchaToken = capWidgetRef.current?.token ?? undefined;
							const registerResponse = await register(
								email.trim(),
								password,
								captchaToken,
							);
							if (registerResponse) {
								if ('jwt' in registerResponse) {
									if (onRegistered) {
										onRegistered();
									} else {
										location.reload();
									}
								} else if ('errors' in registerResponse) {
									setErrors(registerResponse.errors);
									capWidgetRef.current?.reset();
								}
							}
						}
					} catch (e) {
						console.error(e);
						capWidgetRef.current?.reset();
						setErrors({
							...emptyErrors(),
							form: ['Registration failed, please try again.'],
						});
					}
				} else {
					try {
						const loginResponse = await login(email.trim(), password);
						if (loginResponse) {
							if ('register' in loginResponse) {
								if (hosted) {
									setErrors({
										...emptyErrors(),
										form: [t('auth.noAccount')],
									});
								} else {
									navigate('/register', { replace: true });
								}
							} else {
								onAuthenticated?.();
							}
						}
					} catch (e) {
						console.error(e);
						setErrors({
							...emptyErrors(),
							form: ['Login failed, please try again.'],
						});
					}
				}
				setFormSubmitted(false);
			}
		},
		[
			registration,
			email,
			password,
			confirmPassword,
			login,
			register,
			navigate,
			onAuthenticated,
			onRegistered,
			hosted,
		],
	);

	const errorsCount = Object.values(errors)
		.map((array) => array.length)
		.reduce((collector, value) => collector + value);

	const errorsRef = useRef<HTMLElement | null>(null);
	const errorsShown = errorsCount > 0;
	const focusMovedToErrors = useRef(false);

	useEffect(() => {
		if (errorsShown && !focusMovedToErrors.current) {
			focusMovedToErrors.current = true;
			errorsRef.current?.focus();
		} else if (!errorsShown) {
			focusMovedToErrors.current = false;
		}
	}, [errorsShown]);

	const showFormErrors = errors.form.length > 0;
	const showSpecificErrors = errorsCount > errors.form.length;

	return (
		<>
			<form className="auth-form" onSubmit={handleSubmit}>
				{errorsCount > 0 && (
					<section id="form-errors" tabIndex={0} ref={errorsRef}>
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
						{capEndpoint && (
							<cap-widget
								ref={capWidgetRef}
								data-cap-api-endpoint={capEndpoint}
							/>
						)}
					</>
				)}
				<button id="submit" disabled={formSubmitted ? true : false}>
					{registration ? 'register' : 'login'}
				</button>
			</form>
			<p>
				<Link to="/reset-password">forgot password</Link>
			</p>
		</>
	);
};
