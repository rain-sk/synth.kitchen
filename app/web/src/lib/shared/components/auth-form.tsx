import {
	ChangeEvent,
	FormEvent,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react';

import { AuthContext } from '../../../api/auth/context';
import { capEndpoint } from '../../../api/cap';

import 'cap-widget';

type Step = 'email' | 'code';

export const AuthForm: React.FC<{
	onAuthenticated?: () => void;
}> = ({ onAuthenticated }) => {
	const { requestCode, verifyCode } = useContext(AuthContext);

	const [step, setStep] = useState<Step>('email');
	const [email, setEmail] = useState('');
	const [code, setCode] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const captchaRef = useRef<HTMLElementTagNameMap['cap-widget'] | null>(null);

	const handleChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}, []);

	const handleChangeCode = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setCode(e.target.value);
	}, []);

	const handleSendCode = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setError(null);
			setFormSubmitted(true);
			try {
				const captchaToken = captchaRef.current?.token ?? undefined;
				const response = await requestCode(email.trim(), captchaToken);
				if (response && response.success) {
					setStep('code');
					setCode('');
				} else {
					const message = response && 'message' in response ? response.message : 'Could not send the code.';
					setError(message);
					captchaRef.current?.reset();
				}
			} catch (e) {
				console.error(e);
				setError('Could not send the code.');
				captchaRef.current?.reset();
			} finally {
				setFormSubmitted(false);
			}
		},
		[email, requestCode],
	);

	const handleVerifyCode = useCallback(
		async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setError(null);
			setFormSubmitted(true);
			try {
				const response = await verifyCode(email.trim(), code.trim());
				if (response && 'jwt' in response) {
					onAuthenticated?.();
					return;
				}
				setError(response && 'error' in response ? response.error : 'Something went wrong, try again.');
				setCode('');
			} catch (e) {
				console.error(e);
				setError('Something went wrong, try again.');
				setCode('');
			} finally {
				setFormSubmitted(false);
			}
		},
		[email, code, verifyCode, onAuthenticated],
	);

	const errorsRef = useRef<HTMLElement | null>(null);
	const errorShown = error !== null;
	const focusMoved = useRef(false);

	useEffect(() => {
		if (errorShown && !focusMoved.current) {
			focusMoved.current = true;
			errorsRef.current?.focus();
		} else if (!errorShown) {
			focusMoved.current = false;
		}
	}, [errorShown]);

	const goBackToEmail = useCallback(() => {
		setStep('email');
		setCode('');
		setError(null);
	}, []);

	return (
		<>
			{error !== null && (
				<section id="form-errors" tabIndex={0} ref={errorsRef}>
					<p>There is an error.</p>
					<ul>
						<li>{error}</li>
					</ul>
				</section>
			)}

			{step === 'email' ? (
				<form className="auth-form" onSubmit={handleSendCode}>
					<label htmlFor="email">email address</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={handleChangeEmail}
					/>
					{capEndpoint && (
						<cap-widget
							ref={captchaRef}
							data-cap-api-endpoint={capEndpoint}
						/>
					)}
					<button id="submit" disabled={formSubmitted}>
						send sign-in code
					</button>
				</form>
			) : (
				<form className="auth-form" onSubmit={handleVerifyCode}>
					<p id="code-sent">
						We sent a 6-digit code to {email.trim()}. It expires in 10 minutes.
					</p>
					<label htmlFor="code">code</label>
					<input
						id="code"
						type="text"
						inputMode="numeric"
						autoComplete="one-time-code"
						value={code}
						onChange={handleChangeCode}
						maxLength={6}
					/>
					<button id="submit" disabled={formSubmitted}>
						sign in
					</button>
					<button id="change-email" type="button" onClick={goBackToEmail}>
						use a different email
					</button>
				</form>
			)}
		</>
	);
};
