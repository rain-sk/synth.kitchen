import React from 'react';
import { Module } from '../modules/module';
import { IModule } from '../state/types/module';

export const ModuleCanvas: React.FC<{
	modules: Record<string, IModule>;
}> = ({ modules }) => (
	<>
		{Object.values(modules).map((module) => (
			<Module key={module.moduleKey} module={module} />
		))}
	</>
);
