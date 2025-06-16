import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import { ApiContextProvider } from './api/context';

import { PatchesRoute } from './routes/patches';
import { PatchRoute } from './routes/patch';
import { ResetPasswordRoute } from './routes/reset-password';

const RedirectToPatch = () => <Redirect to="/patch" />;

export const SynthKitchen: React.FC = () => {
	return (
		<ApiContextProvider url="http://localhost:3000">
			<Switch>
				<Route path="/" component={RedirectToPatch} />
				<Route path="/patch" component={PatchRoute} />
				<Route path="/patch/:id" component={PatchRoute} />
				<Route path="/patches" component={PatchesRoute} />
				<Route path="/reset-password" component={ResetPasswordRoute} />
				<Route path="/reset-password/:key" component={ResetPasswordRoute} />
			</Switch>
		</ApiContextProvider>
	);
};
