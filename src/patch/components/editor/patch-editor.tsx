import React, { useReducer } from 'react';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { KeyHandler } from './key-handler';
import { ModuleCanvas } from './module-canvas';
import { Connections } from './connections';
import { blankPatch } from '../../state/types/patch';
import { reducer } from '../../state';
import { PatchContextProvider } from '../../contexts/patch';
import { ConnectionContextProvider } from '../../contexts/connection';
import { MidiContextProvider } from '../../contexts/midi';
import { Toolbar } from '../toolbar';
import { PatchLoader } from './patch-loader';

export const PatchEditor: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, blankPatch());

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<ConnectionContextProvider>
				<MidiContextProvider>
					<Toolbar />
					<ModuleCanvasBackdrop>
						<KeyHandler />
						<ModuleCanvas />
						<Connections />
					</ModuleCanvasBackdrop>
					<PatchLoader />
				</MidiContextProvider>
			</ConnectionContextProvider>
		</PatchContextProvider>
	);
};
