import * as React from 'react';

import { Kitchen } from './components/kitchen';
import { ConnectionProvider } from './flux/connections';
import { AuthenticationProvider } from './flux/authentication';

export const App: React.FunctionComponent = () => {
	return (
		<AuthenticationProvider>
			<ConnectionProvider>
				<Kitchen />
			</ConnectionProvider>
		</AuthenticationProvider>
	);
};
