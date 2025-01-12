import React, { useReducer } from 'react';

import { blankPatch, blankPatchToLoad } from '../../state';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { PatchContextProvider } from '../../contexts/patch';
import { reducer } from '../../state/reducers';
import { Toolbar } from '../toolbar';
import { useAudioMidiInit } from './use-audio-midi-init';
import { Init } from './init';
import { useTitle } from 'react-use';
import { useLoadPatch } from './use-load-patch';

const initialState = { ...blankPatch(), ...blankPatchToLoad() };

export const PatchEditor: React.FC<{ id?: string }> = ({ id }) => {
	const { initialized, status, init } = useAudioMidiInit();
	const [state, dispatch] = useReducer(reducer, initialState);

	useTitle(`patch/${state.name}`);

	useLoadPatch(state, dispatch, id);

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
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
