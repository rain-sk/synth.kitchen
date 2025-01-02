import React, { useMemo, useReducer } from 'react';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { KeyHandler } from './key-handler';
import { ModuleCanvas } from './module-canvas';
import { Connections } from './connections';
import { IModule } from '../../state/types/module';
import { blankPatch, Position } from '../../state/types/patch';
import { reducer } from '../../state';
import { PatchContext } from '../../contexts/patch';
import { ConnectionContextProvider } from '../../contexts/connection';
import { MidiContextProvider } from '../../contexts/midi';
import { Toolbar } from '../toolbar';
import { PatchLoader } from './patch-loader';

export const PatchEditor: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, blankPatch());
	const { modulePositions, modules } = state;

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
		<PatchContext.Provider value={{ ...state, dispatch }}>
			<ConnectionContextProvider>
				<MidiContextProvider>
					<Toolbar />
					<ModuleCanvasBackdrop drawOnTop={false}>
						<KeyHandler />
						<ModuleCanvas modulesWithPosition={sortedModules} />
						<Connections />
					</ModuleCanvasBackdrop>
					<PatchLoader />
				</MidiContextProvider>
			</ConnectionContextProvider>
		</PatchContext.Provider>
	);
};
