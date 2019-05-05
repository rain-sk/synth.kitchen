import * as React from 'react';

import { KitchenGridComponent } from './kitchen-grid';
import { KitchenProvider } from '../flux';

export const AppComponent: React.FunctionComponent = props => (
	<KitchenProvider>
		<KitchenGridComponent />
	</KitchenProvider>
);