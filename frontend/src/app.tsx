import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import { PatchesRoute } from './routes/patches';
import { PatchRoute } from './routes/patch';
import { AccountRoute } from './routes/account';
import { SignOutRoute } from './routes/sign-out';

const RedirectToPatch = () => <Redirect to="/patch" />;

export const SynthKitchen: React.FC = () => {
	fetch('/api/')
		.then((res) => res.json())
		.then((data) => console.log(data));
	return (
		<Switch>
			<Route path="/" component={RedirectToPatch} />
			<Route path="/patch" component={PatchRoute} />
			<Route path="/patch/:id" component={PatchRoute} />
			<Route path="/patches" component={PatchesRoute} />
			<Route path="/account" component={AccountRoute} />
			<Route path="/sign-out" component={SignOutRoute} />
		</Switch>
	);
};
