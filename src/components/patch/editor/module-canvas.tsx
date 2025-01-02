import React from 'react';

import { Module } from './module';
import { IModule } from '../../../state/types/module';
import { Position } from '../../../state/types/state';

export const ModuleCanvas: React.FC<{
	modulesWithPosition: [IModule, Position][];
}> = ({ modulesWithPosition }) => (
	<>
		<section id="module-canvas" role="tree" aria-multiselectable>
			{modulesWithPosition.map(([module, position]) => (
				<Module key={module.moduleKey} module={module} position={position} />
			))}
		</section>
	</>
);
