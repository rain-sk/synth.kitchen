import * as React from 'react';

import { Kitchen } from './components/kitchen';
import { AuthenticationProvider } from './flux/authentication';

export const App: React.FunctionComponent = () => {
	return (
		<AuthenticationProvider>
				<Kitchen />
		</AuthenticationProvider>
	);
};
