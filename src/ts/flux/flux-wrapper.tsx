import * as React from 'react';
import { IoProvider } from './io';
import { ModuleProvider } from './module';

export const FluxWrapper: React.FunctionComponent = (props) => {
	return (
		<IoProvider>
			<ModuleProvider>
				{props.children}
			</ModuleProvider>
		</IoProvider>
	)
}