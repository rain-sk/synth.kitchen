import React, { useMemo } from 'react';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { KeyHandler } from '../key-handler';
import { ModuleCanvas } from './module-canvas';
import { Connections } from './connections';
import { useStateContext } from '../../../hooks/use-state-context';
import { IModule } from '../../../state/types/module';
import { Position } from '../../../state/types/state';

export const PatchEditor: React.FC = () => {
	const { modulePositions, modules } = useStateContext();

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
		<ModuleCanvasBackdrop drawOnTop={false}>
			<KeyHandler />
			<ModuleCanvas modulesWithPosition={sortedModules} />
			<Connections />
		</ModuleCanvasBackdrop>
	);
};
