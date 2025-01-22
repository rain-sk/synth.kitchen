import { useCallback } from 'react';
import { audioContext, initAudio } from '../../audio';
import { initMidi, midi } from '../../midi';
import { createGlobalState } from 'react-use';

const audioMidiInitialized = () =>
	audioContext.state === 'running' && midi.initialized;

const useAudioMidiInitialized = createGlobalState(audioMidiInitialized);

const useAudioMidiInitializedStatus = createGlobalState('');

export const useAudioMidiInit = () => {
	const [initialized, setInitialized] = useAudioMidiInitialized();
	const [status, setStatus] = useAudioMidiInitializedStatus();

	const init = useCallback(async () => {
		setStatus('starting audio');
		await initAudio();
		setStatus('starting midi');
		await initMidi();

		if (audioMidiInitialized()) {
			setInitialized(true);
		} else {
			setStatus('initialization failed');
		}
	}, [setInitialized, setStatus]);

	return { initialized, status, init };
};
