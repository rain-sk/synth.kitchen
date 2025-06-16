import React, { useReducer } from 'react';

import { blankPatch, blankPatchToLoad } from '../../state';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { PatchContextProvider } from '../../contexts/patch';
import { patchReducer } from '../../state/reducers';
import { Toolbar } from '../toolbar';
import { useAudioMidiInit } from './use-audio-midi-init';
import { Init } from './init';
import { useTitle } from 'react-use';
import { useLoadPatch } from './use-load-patch';

const initialState = { ...blankPatch(), ...blankPatchToLoad() };

export const PatchEditor: React.FC<{ slug?: string }> = ({ slug }) => {
	const { initialized, status, init } = useAudioMidiInit();
	const [state, dispatch] = useReducer(patchReducer, initialState);

	useTitle(`patch/${state.name ? state.name : 'untitled'}`);

	const loading = useLoadPatch(state, dispatch, slug);

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					<Toolbar />
					{initialized ? (
						<ModuleCanvas state={state} dispatch={dispatch} />
					) : (
						<Init
							loading={loading}
							name={state.name ? state.name : 'untitled'}
							status={status}
							init={init}
						/>
					)}
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
