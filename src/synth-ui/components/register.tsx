import * as React from 'react';
import { useFlux } from 'use-flux';
import { AuthenticationStore, IAuthenticationResponse } from '../flux/authentication';

enum RegisterStatus {
	NoError,
	Error
}

export const Register: React.FunctionComponent = () => {
	const saveAuthenticationResponse = useFlux(AuthenticationStore, ({ dispatch }) => (authenticationResponse: IAuthenticationResponse) => {
		dispatch({ type: 'STORE_TOKEN', payload: authenticationResponse });
	});
	const [registerStatus, setRegisterStatus] = React.useState(RegisterStatus.NoError);
	const [username, setUsername] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [verifyPassword, setVerifyPassword] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [submitting, setSubmitting] = React.useState(false);
	React.useEffect(() => {
		setSubmitting(false);
	}, [])
	const submitLogin = (username: string, password: string) => {
		fetch('https://synth.kitchen/api/wp-json/jwt-auth/v1/token', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ username, password })
		}).then((res: any) => {
			if (res.data && res.data.status === 200) {
				const reader = (res.body as ReadableStream).getReader();
				reader.read().then(({ value }) => {
					const string = new TextDecoder("utf-8").decode(value);
					saveAuthenticationResponse(JSON.parse(string) as IAuthenticationResponse);
				});
			} else {
				setRegisterStatus(RegisterStatus.Error);
			}
		});
	};
	const submitRegister = React.useCallback(() => {
		if (password === verifyPassword && password.length >= 8) {
			setSubmitting(true);
			fetch('https://synth.kitchen/api/wp-json/wp/v2/users/register', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({ username, email, password })
			}).then((res: any) => {
				console.log(res);
				if (res.data && res.data.status === 200) {
					const reader = (res.body as ReadableStream).getReader();
					submitLogin(username, password);
					setPasswordError('');
				} else {
					setRegisterStatus(RegisterStatus.Error);
					setSubmitting(false);
				}
			});
		} else {
			setPasswordError(password === verifyPassword ? 'Password length must be at least 8 characters.' : 'Passwords do not match.')
			setSubmitting(false);
		}
	}, [username, email, password, verifyPassword]);

	const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onChangeVerifyPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVerifyPassword(e.target.value);
	};

	return (
		<fieldset>
			<legend className="visually-hidden">register</legend>
			{registerStatus !== RegisterStatus.Error ? null : (
				<span className="form-error" aria-live="polite">There was an error processing your information. If this problem persists, contact <a href="mailto:help@synth.kitchen">help@synth.kitchen</a>.</span>
			)}
			{submitting ?
				(
					<p>...</p>
				)
				:
				(
					<>
						<label htmlFor="username">username</label>
						<input id="username" type="text" value={username} onChange={onChangeUsername} />
						<label htmlFor="email">email</label>
						<input id="email" type="text" value={email} onChange={onChangeEmail} />
						<label htmlFor="password">password</label>
						<input type="password" id="password" value={password} onChange={onChangePassword} />
						{passwordError ? <a href="#password" aria-describes="password" aria-live="assertive">{passwordError}</a> : null}
						<label htmlFor="password">verify password</label>
						<input type="password" id="password" value={verifyPassword} onChange={onChangeVerifyPassword} />
						<button type="button" onClick={submitRegister}>register</button>
					</>
				)
			}
		</fieldset >
	)
}