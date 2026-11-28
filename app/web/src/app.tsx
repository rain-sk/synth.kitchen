import React from 'react';
import { Redirect, Route, Switch, useRoute } from 'wouter';

import { AccountRoute } from './routes/account';
import { DashboardRoute } from './routes/dashboard';
import { IndexRoute } from './routes/index';
import { LoginRoute } from './routes/login';
import { LogoutRoute } from './routes/logout';
import { PatchRoute } from './routes/patch';
import { Nav } from './lib/shared/components/nav';
import { AuthModal } from './lib/shared/components/auth-modal';
import { crashHooksEnabled, crashKind } from './crash-hooks';
import {
	ErrorBoundary,
	ThrowOnPurpose,
} from './lib/shared/components/error-boundary';
import { ToastsProvider } from './lib/shared/components/toasts';
// import { LearnRoute } from './routes/learn';

const RedirectToPatch = () => {
	const [match, params] = useRoute('/p/:slug');
	return match ? (
		<Redirect to={`/patch/${params.slug}`} replace />
	) : (
		<Redirect to="/patch/new" replace />
	);
};

export const SynthKitchen: React.FC = () => {
	return (
		<ToastsProvider>
			<Nav />
			<ErrorBoundary region="app">
				{crashHooksEnabled && crashKind() === 'app' ? (
					<ThrowOnPurpose />
				) : (
					<Switch>
						<Route path="/" component={IndexRoute} />
						<Route path="/dashboard" component={DashboardRoute} />

						<Route path="/beta" component={RedirectToPatch} />
						<Route path="/p" component={RedirectToPatch} />
						<Route path="/p/:slug" component={RedirectToPatch} />
						<Route path="/patch" component={RedirectToPatch} />
						<Route path="/patch/:slug" component={PatchRoute} />

						{/* <Route path="/learn" component={LearnRoute} /> */}

						<Route path="/account" component={AccountRoute} />
						<Route path="/login" component={LoginRoute} />
						<Route path="/register" component={() => <Redirect to="/login" replace />} />
						<Route path="/logout" component={LogoutRoute} />
					</Switch>
				)}
			</ErrorBoundary>
			<ErrorBoundary region="auth">
				<AuthModal />
			</ErrorBoundary>
		</ToastsProvider>
	);
};
