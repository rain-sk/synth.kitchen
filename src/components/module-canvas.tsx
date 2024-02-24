import React from 'react';
import { Module } from './module';
import { IModule } from '../state/types/module';
import { useStateContext } from '../hooks/use-state-context';

export const ModuleCanvas: React.FC<{
	modules: IModule[];
}> = ({ modules }) => {
	const { modulePositions } = useStateContext();

	return (
		<>
			<section id="module-canvas" role="tree" aria-multiselectable>
				{modules.map((module) => (
					<Module
						key={module.moduleKey}
						module={module}
						position={modulePositions[module.moduleKey]}
					/>
				))}
			</section>
		</>
	);
};
