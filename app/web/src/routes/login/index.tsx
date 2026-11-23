import { useContext, useMemo, useState } from 'react';
import { Redirect, useSearchParams } from 'wouter';
import { usePathname } from 'wouter/use-browser-location';
import { useTitle } from 'react-use';

import { AuthContext } from '../../api/auth/context';
import { Loader } from '../../lib/shared/components/loader';
import { AuthForm } from '../../lib/shared/components/auth-form';
import { useEffectOnce } from '../../lib/patch/components/module/use-effect-once';

import './styles.css';

export const LoginRoute = () => {
	const { user, loading } = useContext(AuthContext);
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
				<AuthForm mode={registration ? 'register' : 'login'} />
			</section>
		</main>
	);
};
