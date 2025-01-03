import React, { useContext, useMemo } from 'react';

import { IModule } from '../../state/types/module';
import { Module } from '../module';
import { PatchContext } from '../../contexts/patch';
import { Position } from '../../state/types/patch';

export const ModuleCanvas: React.FC<{}> = () => {
	const { modulePositions, modules } = useContext(PatchContext);

	const sortedModules = useMemo(
		() =>
			Object.entries(modulePositions)
				.sort(
					([, [ax, ay]], [, [bx, by]]) =>
						Math.sqrt(Math.pow(ax, 2) + Math.pow(ay, 2)) -
						Math.sqrt(Math.pow(bx, 2) + Math.pow(by, 2)),
				)
				.map(([moduleKey, position]): [IModule, Position] => [
					modules[moduleKey],
					position,
				]),
		[modulePositions, modules],
	);

	return (
		<section id="module-canvas" role="tree" aria-multiselectable>
			{sortedModules.map(([module, position]) => (
				<Module key={module.moduleKey} module={module} position={position} />
			))}
		</section>
	);
};
