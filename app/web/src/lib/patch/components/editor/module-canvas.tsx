import React, { useMemo } from 'react';

import { ModuleWrapper } from '../module';
import { IPatchState } from '../../state/types/patch';
import { IPatchAction } from '../../state/actions';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { KeyHandler } from './key-handler';
import { ConnectionsWrapper } from './connections';
import { Module, ModulePosition } from 'synth.kitchen-shared';

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
				.map(([moduleKey, position]): [Module, ModulePosition] => [
					state.modules[moduleKey],
					position,
				]),
		[state.modulePositions, state.modules],
	);

	return (
		<ModuleCanvasBackdrop state={state} dispatch={dispatch}>
			<KeyHandler />
			<section id="module-canvas" role="tree" aria-multiselectable>
				{sortedModules.map(([module, position]) => (
					<ModuleWrapper
						key={module.moduleKey}
						module={module}
						position={position}
						state={state}
						dispatch={dispatch}
					/>
				))}
			</section>
			<ConnectionsWrapper state={state} />
		</ModuleCanvasBackdrop>
	);
};
