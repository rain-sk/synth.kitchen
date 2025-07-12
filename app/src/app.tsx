import React from 'react';
import { Redirect, Route, Switch, useRoute } from 'wouter';

import { AccountRoute } from './routes/account';
import { IndexRoute } from './routes/index';
import { LoginRoute } from './routes/login';
import { LogoutRoute } from './routes/logout';
import { RecipeRoute } from './routes/recipe';
import { ResetPasswordRoute } from './routes/reset-password';
import { DashboardRoute } from './routes/dashboard';

const RedirectToRecipe = () => {
	const [match, params] = useRoute('/patch/:id');

	if (match) {
		return <Redirect to={`/recipe/${params.id}`} />;
	} else {
		return <Redirect to="/recipe" />;
	}
};

export const SynthKitchen: React.FC = () => {
	return (
		<Switch>
			<Route path="/" component={IndexRoute} />
			<Route path="/dashboard" component={DashboardRoute} />

			<Route path="/patch" component={RedirectToRecipe} />
			<Route path="/patch/:id" component={RedirectToRecipe} />

			<Route path="/recipe" component={RecipeRoute} />
			<Route path="/recipe/:id" component={RecipeRoute} />

			<Route path="/account" component={AccountRoute} />
			<Route path="/login" component={LoginRoute} />
			<Route path="/logout" component={LogoutRoute} />
			<Route path="/reset-password" component={ResetPasswordRoute} />
			<Route path="/reset-password/:key" component={ResetPasswordRoute} />
		</Switch>
	);
};
