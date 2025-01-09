import React, { useMemo } from 'react';

import { IModule } from '../../state/types/module';
import { Module } from '../module';
import { IPatchState, Position } from '../../state/types/patch';
import { IPatchAction } from '../../state/actions';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { KeyHandler } from './key-handler';
import { Connections } from './connections';

export const ModuleCanvas: React.FC<{
	state: IPatchState;
	dispatch: React.Dispatch<IPatchAction>;
}> = ({ state, dispatch }) => {
	const sortedModules = useMemo(
		() =>
			Object.entries(state.modulePositions)
				.sort(
					([, [ax, ay]], [, [bx, by]]) =>
						Math.sqrt(Math.pow(ax, 2) + Math.pow(ay, 2)) -
						Math.sqrt(Math.pow(bx, 2) + Math.pow(by, 2)),
				)
				.map(([moduleKey, position]): [IModule, Position] => [
					state.modules[moduleKey],
					position,
				]),
		[state.modulePositions, state.modules],
	);

	const moduleCanvasBackdropProps = useMemo(
		() => ({
			dispatch,
			modulePositions: state.modulePositions,
			modules: state.modules,
			selectedModuleKeys: state.selectedModuleKeys,
		}),
		[dispatch, state.modulePositions, state.modules, state.selectedModuleKeys],
	);

	const connectionsProps = useMemo(
		() => ({
			activeConnectorKey: state.activeConnectorKey,
			modules: state.modules,
			modulePositions: state.modulePositions,
			connections: state.connections,
			connectors: state.connectors,
		}),
		[
			state.activeConnectorKey,
			state.modules,
			state.modulePositions,
			state.connections,
			state.connectors,
		],
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
						selectedModuleKeys={state.selectedModuleKeys}
						selectionPending={state.selectionPending}
						heldModifiers={state.heldModifiers}
						dispatch={dispatch}
					/>
				))}
			</section>
			<Connections {...connectionsProps} />
		</ModuleCanvasBackdrop>
	);
};
