import React from 'react';
import { Route, Switch } from 'wouter';

import { HomeRoute } from './routes/home';
import { PatchRoute } from './routes/patch';

export const SynthKitchen: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={HomeRoute} />
			<Route path="/patch" component={PatchRoute} />
		</Switch>
	);
};
