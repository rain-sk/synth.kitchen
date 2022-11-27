import React, { useState } from 'react';
import { Module } from './module';
import { IModule } from '../state/types/module';
import { useStateContext } from '../hooks/use-state-context';

export const ModuleCanvas: React.FC<{
	modules: Record<string, IModule>;
}> = ({ modules }) => {
	const { isDraggingModules } = useStateContext();

	return (
		<section
			id="module-canvas"
			className={isDraggingModules ? 'dragging' : ''}
			role="tree"
			aria-multiselectable
		>
			{Object.values(modules).map((module) => (
				<Module key={module.moduleKey} module={module} />
			))}
		</section>
	);
};
