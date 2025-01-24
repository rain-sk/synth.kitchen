import { signOut } from 'supertokens-auth-react/recipe/session';
import { useEffect, useRef } from 'react';
import { navigate } from 'wouter/use-browser-location';

export const SignOutRoute = () => {
	const signingOutRef = useRef(false);
	useEffect(() => {
		if (!signingOutRef.current) {
			signingOutRef.current = true;
			(async () => {
				await signOut();
				signingOutRef.current = false;
				navigate('/');
			})();
		}
	}, []);
	return null;
};
