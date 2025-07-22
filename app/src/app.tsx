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
	const [match, params] = useRoute('/patch/:id');

	if (match) {
		return <Redirect to={`/patch/${params.id}`} />;
	} else {
		return <Redirect to="/patch" />;
	}
};

export const SynthKitchen: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={IndexRoute} />
			<Route path="/dashboard" component={DashboardRoute} />

			<Route path="/patch" component={RedirectToPatch} />
			<Route path="/patch/:id" component={RedirectToPatch} />

			<Route path="/patch" component={PatchRoute} />
			<Route path="/patch/:id" component={PatchRoute} />

			<Route path="/account" component={AccountRoute} />
			<Route path="/login" component={LoginRoute} />
			<Route path="/logout" component={LogoutRoute} />
			<Route path="/reset-password" component={ResetPasswordRoute} />
			<Route path="/reset-password/:key" component={ResetPasswordRoute} />
		</Switch>
	);
};
