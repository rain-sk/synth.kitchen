import React from 'react';

import { IModule } from '../../state/types/module';
import { Position } from '../../state/types/patch';
import { Module } from '../module';

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
