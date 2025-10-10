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
import { AsyncQueueDispatcher } from './async-queue-dispatcher';
import { useAudioMidiInit } from './utils/use-audio-midi-init';
import { useLoadPatch } from './utils/use-load-patch';

const initialState = { ...blankPatch() };

export const PatchEditor: React.FC<{ slug?: string }> = ({ slug }) => {
	const [randomPatch] = useRoute('/patch/random');
	const { initialized, status, initAudioMidi } = useAudioMidiInit();
	const [state, dispatch] = useReducer(patchReducer, initialState);

	const { loading, patchInfo } = useLoadPatch(
		state,
		dispatch,
		initialized,
		slug ?? '',
	);

	const init = useCallback(async () => {
		await initAudioMidi();
	}, []);

	const name = loading
		? '...'
		: state.name
		? state.name
		: randomPatch
		? 'random'
		: patchInfo && patchInfo.name
		? patchInfo.name
		: 'untitled';

	useTitle(`patch/${name}`);
	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<AsyncQueueDispatcher
				asyncActionQueue={state.asyncActionQueue}
				dispatch={dispatch}
			/>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					{initialized ? (
						<ModuleCanvas state={state} dispatch={dispatch} />
					) : (
						<Init loading={loading} name={name} status={status} init={init} />
					)}
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
		</PatchContextProvider>
	);
};
