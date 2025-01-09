import React, { useMemo } from 'react';

import { IModule } from '../../state/types/module';
import { Module } from '../module';
import { Position } from '../../state/types/patch';
import { Modifier } from '../../../constants/key';
import { IPatchAction } from '../../state/actions';

export const ModuleCanvas: React.FC<{
	modulePositions: Record<string, Position>;
	modules: Record<string, IModule>;
	selectedModuleKeys: Set<string>;
	selectionPending: boolean;
	heldModifiers: Modifier;
	dispatch: React.Dispatch<IPatchAction>;
}> = ({
	modulePositions,
	modules,
	selectedModuleKeys,
	selectionPending,
	heldModifiers,
	dispatch,
}) => {
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
				<Module
					key={module.moduleKey}
					module={module}
					position={position}
					selectedModuleKeys={selectedModuleKeys}
					selectionPending={selectionPending}
					heldModifiers={heldModifiers}
					dispatch={dispatch}
				/>
			))}
		</section>
	);
};
