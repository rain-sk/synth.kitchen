import { useContext, useState } from 'react';
import { Redirect, useSearchParams } from 'wouter';
import { useTitle } from 'react-use';

import { AuthContext } from '../../api/auth/context';
import { Loader } from '../../lib/shared/components/loader';
import { AuthForm } from '../../lib/shared/components/auth-form';
import { useEffectOnce } from '../../lib/patch/components/module/use-effect-once';

import './styles.css';

export const LoginRoute = () => {
	const { user, loading } = useContext(AuthContext);
	const [searchParams] = useSearchParams();
	useTitle('synth.kitchen | sign in');

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
				<h2>sign in</h2>
				<AuthForm />
			</section>
		</main>
	);
};
