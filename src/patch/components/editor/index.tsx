import React, { useReducer } from 'react';

import { blankPatch } from '../../state';
import { ConnectionContextProvider } from '../../contexts/connection';
import { Connections } from './connections';
import { KeyHandler } from './key-handler';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { PatchContextProvider } from '../../contexts/patch';
import { PatchLoader } from './patch-loader';
import { reducer } from '../../state/reducers';
import { Toolbar } from '../toolbar';
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
