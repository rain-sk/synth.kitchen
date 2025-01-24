import { signOut } from 'supertokens-auth-react/recipe/session';
import { useUserContext } from 'supertokens-auth-react';
import { useEffect, useRef } from 'react';
import { navigate } from 'wouter/use-browser-location';

export const SignOutRoute = () => {
	const userContext = useUserContext();
	const signingOutRef = useRef(false);
	useEffect(() => {
		if (userContext && !signingOutRef.current) {
			signingOutRef.current = true;
			(async () => {
				await signOut();
				signingOutRef.current = false;
				navigate('/account');
			})();
		}
	}, [userContext]);
	return null;
};
