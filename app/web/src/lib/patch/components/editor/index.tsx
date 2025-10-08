import React, { useCallback, useReducer } from 'react';
import { useTitle } from 'react-use';
import { useRoute } from 'wouter';

import { blankPatch } from '../../state';
import { patchReducer } from '../../state/reducers';
import { DerivedConnectionStateContextProvider } from '../../contexts/derived-connection-state';
import { MidiContextProvider } from '../../contexts/midi';
import { ModuleCanvas } from './module-canvas';
import { PatchContextProvider } from '../../contexts/patch';
import { Init } from './init';
import { AsyncQueue } from './async-queue';
import { useAudioMidiInit } from './utils/use-audio-midi-init';
import { useLoadPatch } from './utils/use-load-patch';
import { patchActions } from '../../state/actions';

const initialState = { ...blankPatch() };

export const PatchEditor: React.FC<{ slug?: string }> = ({ slug }) => {
	const [random] = useRoute('/patch/random');
	const { initialized, status, initAudioMidi } = useAudioMidiInit();
	const [state, dispatch] = useReducer(patchReducer, initialState);

	useTitle(random ? '...' : `patch/${state.name ? state.name : 'untitled'}`);

	const loading = useLoadPatch(state, dispatch, initialized, slug);

	const init = useCallback(async () => {
		await initAudioMidi();
		dispatch(patchActions.loadConnectionsAction());
	}, []);

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
							init={init}
						/>
					)}
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
