import React from 'react';
import { Route, Switch } from 'wouter';

import { HomeRoute } from './routes/home';
import { PatchRoute } from './routes/patch';

export const SynthKitchen: React.FC = () => {
	fetch('/api/hello')
		.then((res) => res.json())
		.then((data) => console.log(data));
	return (
		<Switch>
			<Route path="/" component={HomeRoute} />
			<Route path="/patch" component={PatchRoute} />
			<Route path="/patch/:id" component={PatchRoute} />
		</Switch>
	);
};
