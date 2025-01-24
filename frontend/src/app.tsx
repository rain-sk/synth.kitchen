import React from 'react';
import { Route, Switch } from 'wouter';

import { HomeRoute } from './routes/home';
import { PatchRoute } from './routes/patch';
import { AccountRoute } from './routes/account';
import { SignOutRoute } from './routes/sign-out';

export const SynthKitchen: React.FC = () => {
	fetch('/api/hello')
		.then((res) => res.json())
		.then((data) => console.log(data));
	return (
		<Switch>
			<Route path="/" component={HomeRoute} />
			<Route path="/patch" component={PatchRoute} />
			<Route path="/patch/:id" component={PatchRoute} />
			<Route path="/account" component={AccountRoute} />
			<Route path="/sign-out" component={SignOutRoute} />
		</Switch>
	);
};
