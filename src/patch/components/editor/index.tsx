import React, { useMemo, useReducer } from 'react';

import { blankPatch } from '../../state';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { Connections } from './connections';
import { KeyHandler } from './key-handler';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { ModuleCanvasBackdrop } from './module-canvas-backdrop';
import { PatchContextProvider } from '../../contexts/patch';
import { PatchLoader } from './patch-loader';
import { reducer } from '../../state/reducers';
import { Toolbar } from '../toolbar';
import { useLoadConnections } from './use-load-connections';
import { useAudioMidiInit } from './use-audio-midi-init';
import { Init } from './init';
import { useTitle } from 'react-use';

export const PatchEditor: React.FC = () => {
	const { initialized, status, init } = useAudioMidiInit();

	const [state, dispatch] = useReducer(reducer, blankPatch());

	useTitle(`patch/${state.name}`);

	useLoadConnections({ ...state, dispatch, initialized });

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					<Toolbar />
					{initialized ? (
						<ModuleCanvas state={state} dispatch={dispatch} />
					) : (
						<Init name={state.name} status={status} init={init} />
					)}
					<PatchLoader />
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
