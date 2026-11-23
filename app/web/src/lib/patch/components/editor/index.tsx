import React, { useCallback, useEffect, useReducer } from 'react';
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
import {
	ErrorBoundary,
	ThrowOnPurpose,
} from '../../../shared/components/error-boundary';
import { useAudioMidiInit } from './utils/use-audio-midi-init';
import { useLoadPatch } from './utils/use-load-patch';
import { useDraft } from './utils/use-draft';
import { DraftContextProvider } from '../../contexts/draft';
import { Preset } from '../../../learn';
import { IPatchState } from '../../state/types/patch';

const initialState = { ...blankPatch() };

export const PatchEditor: React.FC<{
	slug?: string;
	preset?: Preset;
	stateCallback?: (state: IPatchState) => void;
}> = ({ slug, preset, stateCallback }) => {
	const [randomPatch] = useRoute('/patch/random');
	const {
		initialized,
		status,
		askWithoutMidi,
		initAudioMidi,
		startWithoutMidi,
	} = useAudioMidiInit();
	const [state, dispatch] = useReducer(patchReducer, initialState);

	const { loading, patchInfo } = useLoadPatch(
		state,
		dispatch,
		initialized,
		slug,
		preset,
	);

	const draftValue = useDraft({
		state,
		dispatch,
		initialized,
		loading,
		preset,
	});

	const init = useCallback(async () => {
		await initAudioMidi();
	}, []);

	useEffect(() => {
		if (stateCallback) {
			stateCallback(state);
		}
	}, [stateCallback, state]);

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

	const minimal = !!preset;

	return (
		<PatchContextProvider {...state} dispatch={dispatch}>
			<DraftContextProvider value={draftValue}>
			<AsyncQueueDispatcher
				asyncActionQueue={state.asyncActionQueue}
				dispatch={dispatch}
			/>
			<DerivedConnectionStateContextProvider {...state}>
				<MidiContextProvider>
					{!initialized ? (
						<Init
							loading={loading}
							name={name}
							status={status}
							init={init}
							askWithoutMidi={askWithoutMidi}
							startWithoutMidi={startWithoutMidi}
						/>
					) : (
						<ErrorBoundary region="canvas" getState={() => state}>
							{import.meta.env.DEV &&
							new URLSearchParams(window.location.search).get('crash') ===
							'canvas' ? (
								<ThrowOnPurpose />
							) : (
								<ModuleCanvas
									state={state}
									dispatch={dispatch}
									minimal={minimal}
								/>
							)}
						</ErrorBoundary>
					)}
				</MidiContextProvider>
			</DerivedConnectionStateContextProvider>
			</DraftContextProvider>
		</PatchContextProvider>
	);
};
