import { useContext } from 'react';
import { Redirect } from 'wouter';

import { AuthContext } from '../../api/auth/context';
import { Loader } from '../../lib/shared/components/loader';
// import { Onboarding } from './onboarding';

export const IndexRoute = () => {
	const { user, loading } = useContext(AuthContext);

	if (loading) {
		return <Loader />;
	}

	if (user) {
		return <Redirect to="/dashboard" replace />;
	}

	return <Redirect to="/patch" />;

	// return <Onboarding />;
};
