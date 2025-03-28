import React from 'react';
import { Redirect, Route, Switch } from 'wouter';

import { PatchesRoute } from './routes/patches';
import { PatchRoute } from './routes/patch';

const RedirectToPatch = () => <Redirect to="/patch" />;

export const SynthKitchen: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={RedirectToPatch} />
			<Route path="/patch" component={PatchRoute} />
			<Route path="/patch/:id" component={PatchRoute} />
			<Route path="/patches" component={PatchesRoute} />
		</Switch>
	);
};
