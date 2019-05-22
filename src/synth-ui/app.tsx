import * as React from 'react';

import { Kitchen } from './unique/kitchen';
import { ConnectionProvider } from './flux/connections';

export const App: React.FunctionComponent = () => {
	return (
		<ConnectionProvider>
			<Kitchen />
		</ConnectionProvider>
	);
};
