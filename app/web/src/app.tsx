import React from 'react';
import { Redirect, Route, Switch, useRoute } from 'wouter';

import { AccountRoute } from './routes/account';
import { IndexRoute } from './routes/index';
import { LoginRoute } from './routes/login';
import { LogoutRoute } from './routes/logout';
import { PatchRoute } from './routes/patch';
import { ResetPasswordRoute } from './routes/reset-password';
import { DashboardRoute } from './routes/dashboard';

const RedirectToPatch = () => {
	const [match, params] = useRoute('/p/:slug');
	return match ? (
		<Redirect to={`/patch/${params.slug}`} />
	) : (
		<Redirect to="/patch/new" />
	);
};

export const SynthKitchen: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={IndexRoute} />
			<Route path="/dashboard" component={DashboardRoute} />

			<Route path="/p" component={RedirectToPatch} />
			<Route path="/p/:slug" component={RedirectToPatch} />

			<Route path="/patch" component={PatchRoute} />
			<Route path="/patch/:slug" component={PatchRoute} />

			<Route path="/account" component={AccountRoute} />
			<Route path="/login" component={LoginRoute} />
			<Route path="/register" component={LoginRoute} />
			<Route path="/logout" component={LogoutRoute} />
			<Route path="/reset-password" component={ResetPasswordRoute} />
			<Route path="/reset-password/:key" component={ResetPasswordRoute} />
		</Switch>
	);
};
