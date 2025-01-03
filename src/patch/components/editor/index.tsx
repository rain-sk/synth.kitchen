import React, { useReducer } from 'react';

import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { KeyHandler } from './key-handler';
import { ModuleCanvas } from './module-canvas';
import { Connections } from './connections';
import { blankPatch } from '../../state';
import { PatchContextProvider } from '../../contexts/patch';
import { ConnectionContextProvider } from '../../contexts/connection';
import { MidiContextProvider } from '../../contexts/midi';
import { Toolbar } from '../toolbar';
import { PatchLoader } from './patch-loader';
import { reducer } from '../../state/reducers';
import { useEffectToMaintainDerivedConnectorState } from '../../hooks/useDerivedConnectorState';

export const PatchEditor: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, blankPatch());
	useEffectToMaintainDerivedConnectorState(state.activeConnectorKey);
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
