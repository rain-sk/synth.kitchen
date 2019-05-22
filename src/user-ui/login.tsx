import * as React from 'react';
import { useFlux } from 'use-flux';
import { AuthenticationStore, IAuthenticationResponse } from './flux/authentication';

enum LoginStatus {
	NoError,
	Error
}

export const Login: React.FunctionComponent = () => {
	const saveAuthenticationResponse = useFlux(AuthenticationStore, ({ dispatch }) => (authenticationResponse: IAuthenticationResponse) => {
		dispatch({ type: 'STORE_TOKEN', payload: authenticationResponse });
	});
	const [loginStatus, setLoginStatus] = React.useState(LoginStatus.NoError);
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const submitLogin = React.useCallback(() => {
		fetch('https://synth.kitchen/api/wp-json/jwt-auth/v1/token', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ username, password })
		}).then((res: any) => {
			console.log(res);
			if (res.data && res.data.status === 200) {
				const reader = (res.body as ReadableStream).getReader();
				reader.read().then(({ value }) => {
					const string = new TextDecoder("utf-8").decode(value);
					saveAuthenticationResponse(JSON.parse(string) as IAuthenticationResponse);
				});
			} else {
				setLoginStatus(LoginStatus.Error);
			}
		});
	}, [username, password]);

	const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	return (
		<fieldset>
			<legend className="visually-hidden">login</legend>
			{loginStatus !== LoginStatus.Error ? null : (
				<span className="form-error" aria-live="polite">There was an error processing your information. Please try again.</span>
			)}
			<label htmlFor="username">username</label>
			<input id="username" type="text" value={username} onChange={onChangeUsername} />
			<label htmlFor="password">password</label>
			<input id="password" type="text" value={password} onChange={onChangePassword} />
			<button type="button" onClick={submitLogin}>login</button>
		</fieldset>
	)
}