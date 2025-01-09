import React, { useMemo } from 'react';

import { IModule } from '../../state/types/module';
import { Module, ModuleProps } from '../module';
import { Position } from '../../state/types/patch';
import { IPatchAction } from '../../state/actions';
import {
	ModuleCanvasBackdrop,
	ModuleCanvasBackdropProps,
} from './module-canvas-backdrop';
import { KeyHandler } from './key-handler';
import { Connections, ConnectionsProps } from './connections';

export const ModuleCanvas: React.FC<{
	moduleCanvasBackdropProps: ModuleCanvasBackdropProps;
	connectionsProps: ConnectionsProps;
	moduleProps: ModuleProps;
	modulePositions: Record<string, Position>;
	modules: Record<string, IModule>;
	dispatch: React.Dispatch<IPatchAction>;
}> = ({
	moduleProps,
	moduleCanvasBackdropProps,
	connectionsProps,
	modulePositions,
	modules,
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
		<ModuleCanvasBackdrop {...moduleCanvasBackdropProps}>
			<KeyHandler />
			<section id="module-canvas" role="tree" aria-multiselectable>
				{sortedModules.map(([module, position]) => (
					<Module
						key={module.moduleKey}
						module={module}
						position={position}
						selectedModuleKeys={moduleProps.selectedModuleKeys}
						selectionPending={moduleProps.selectionPending}
						heldModifiers={moduleProps.heldModifiers}
						dispatch={dispatch}
					/>
				))}
			</section>
			<Connections {...connectionsProps} />
		</ModuleCanvasBackdrop>
	);
};
