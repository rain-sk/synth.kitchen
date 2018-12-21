import * as React from 'react';

import { FluxWrapper } from '../flux/flux-wrapper';
import { ContextWrapper } from '../contexts/context-wrapper';
import { KitchenGridComponent } from './kitchen-grid';

export const AppComponent: React.FunctionComponent = props => (
	<ContextWrapper>
		<FluxWrapper>
			<KitchenGridComponent />
		</FluxWrapper>
	</ContextWrapper>
);