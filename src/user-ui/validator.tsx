import * as React from 'react';
import { useFlux } from 'use-flux';
import { AuthenticationStore, IValidationResponse } from './flux/authentication';

export const Validator: React.FunctionComponent = () => {
	const { token, saveValidationResponse, clearToken } = useFlux(AuthenticationStore, ({ state, dispatch }) => ({
		token: state.token,
		saveValidationResponse: (validationResponse: IValidationResponse) => {
			dispatch({ type: 'VALIDATE_TOKEN', payload: validationResponse });
		},
		clearToken: () => {
			dispatch({ type: 'CLEAR_TOKEN' });
		}
	}));

	React.useEffect(() => {
		if (token) {
			fetch('https://synth.kitchen/api/wp-json/jwt-auth/v1/token/validate', {
				headers: {
					'Authorization': `Bearer ${token}`
				},
				method: "POST"
			}).then(res => {
				const reader = (res.body as ReadableStream).getReader();
				reader.read().then(({ value }) => {
					const string = new TextDecoder("utf-8").decode(value);
					saveValidationResponse(JSON.parse(string) as IValidationResponse);
				});
			}).catch(err => {
				console.error(err);
				clearToken();
			});
		} else {
			clearToken();
		}
	}, []);

	return null;
}