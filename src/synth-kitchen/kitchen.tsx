import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './routes/home';
import { FourOhFour } from './routes/four-oh-four';
import { PatchEditor } from './routes/patch-editor';

export const Kitchen: React.FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/patch">
					<PatchEditor />
				</Route>
				<Route path="/patch/:id">
					<PatchEditor />
				</Route>
				<Route path="">
					<FourOhFour />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};
