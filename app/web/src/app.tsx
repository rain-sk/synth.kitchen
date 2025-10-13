import React from 'react';
import { Redirect, Route, Switch, useRoute } from 'wouter';

import { AccountRoute } from './routes/account';
import { DashboardRoute } from './routes/dashboard';
import { IndexRoute } from './routes/index';
import { LoginRoute } from './routes/login';
import { LogoutRoute } from './routes/logout';
import { PatchRoute } from './routes/patch';
import { ResetPasswordRoute } from './routes/reset-password';
import { Nav } from './lib/shared/components/nav';

const RedirectToPatch = () => {
	const [match, params] = useRoute('/p/:slug');
	return match ? (
		<Redirect to={`/patch/${params.slug}`} replace />
	) : (
		<Redirect to="/patch/new" replace />
	);
};

export const SynthKitchen: React.FC = () => {
	return (
		<>
			<Nav />
			<Switch>
				<Route path="/" component={IndexRoute} />
				<Route path="/dashboard" component={DashboardRoute} />

				<Route path="/p" component={RedirectToPatch} />
				<Route path="/p/:slug" component={RedirectToPatch} />
				<Route path="/patch" component={RedirectToPatch} />
				<Route path="/beta" component={RedirectToPatch} />

				<Route path="/patch/:slug" component={PatchRoute} />

				<Route path="/account" component={AccountRoute} />
				<Route path="/login" component={LoginRoute} />
				<Route path="/register" component={LoginRoute} />
				<Route path="/logout" component={LogoutRoute} />
				<Route path="/reset-password" component={ResetPasswordRoute} />
				<Route path="/reset-password/:key" component={ResetPasswordRoute} />
			</Switch>
		</>
	);
};
