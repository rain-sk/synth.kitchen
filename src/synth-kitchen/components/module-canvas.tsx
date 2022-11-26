import React from 'react';
import { Module } from './module';
import { IModule } from '../state/types/module';

export const ModuleCanvas: React.FC<{
	modules: Record<string, IModule>;
}> = ({ modules }) => (
	<section id="module-canvas" role="tree" aria-multiselectable>
		{Object.values(modules).map((module) => (
			<Module key={module.moduleKey} module={module} />
		))}
	</section>
);
