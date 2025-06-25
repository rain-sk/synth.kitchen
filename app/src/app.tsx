import React from 'react';
import { Route, Switch } from 'wouter';

import { AuthContextProvider } from './api/auth/context';

import { PatchesRoute } from './routes/patches';
import { PatchRoute } from './routes/patch';
import { ResetPasswordRoute } from './routes/reset-password';
import { LoginRoute } from './routes/login';
import { AccountRoute } from './routes/account';
import { LogoutRoute } from './routes/logout';
import { IndexRoute } from './routes/index';

export const SynthKitchen: React.FC = () => {
	return (
		<AuthContextProvider>
			<Switch>
				<Route path="/" component={IndexRoute} />
				<Route path="/patch" component={PatchRoute} />
				<Route path="/patch/:id" component={PatchRoute} />
				<Route path="/patches" component={PatchesRoute} />

				<Route path="/account" component={AccountRoute} />
				<Route path="/login" component={LoginRoute} />
				<Route path="/logout" component={LogoutRoute} />
				<Route path="/reset-password" component={ResetPasswordRoute} />
				<Route path="/reset-password/:key" component={ResetPasswordRoute} />
			</Switch>
		</AuthContextProvider>
	);
};
