import React, { useReducer } from 'react';

import { blankPatch } from '../../state';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { PatchContextProvider } from '../../contexts/patch';
import { patchReducer } from '../../state/reducers';
import { useAudioMidiInit } from './use-audio-midi-init';
import { Init } from './init';
import { useLoadPatch } from './use-load-patch';
import { AsyncQueue } from './utils/async-queue';

const initialState = { ...blankPatch() };

export const PatchEditor: React.FC<{ slug?: string }> = ({ slug }) => {
	const { initialized, status, initAudioMidi } = useAudioMidiInit();
	const [state, dispatch] = useReducer(patchReducer, initialState);

	useTitle(`patch/${state.name ? state.name : 'untitled'}`);

	const loading = useLoadPatch(state, dispatch, initialized, slug);

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<AsyncQueue
				asyncActionQueue={state.asyncActionQueue}
				dispatch={dispatch}
			/>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					{initialized ? (
						<ModuleCanvas state={state} dispatch={dispatch} />
					) : (
						<Init
							loading={loading}
							name={state.name ? state.name : 'untitled'}
							status={status}
							init={initAudioMidi}
						/>
					)}
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
