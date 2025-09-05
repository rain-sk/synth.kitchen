import { useCallback, useRef } from 'react';
import { createGlobalState } from 'react-use';
import { audioContext, initAudio } from '../../audio';
import { initMidi } from '../../midi';

const audioInitialized = () => audioContext.state === 'running';

const useAudioInitialized = createGlobalState(audioInitialized);

const useAudioInitializedStatus = createGlobalState('');

export const useAudioMidiInit = () => {
	const [initialized, setInitialized] = useAudioInitialized();
	const [status, setStatus] = useAudioInitializedStatus();

	const initCalledRef = useRef(false);
	const initAudioMidi = useCallback(async () => {
		if (initCalledRef.current) {
			return;
		}
		initCalledRef.current = true;
		setStatus('starting audio');
		await initAudio();
		setStatus('starting midi');
		await initMidi();

		if (audioInitialized()) {
			setInitialized(true);
		} else {
			setStatus('initialization failed');
		}
	}, [setInitialized, setStatus]);

	return { initialized, status, initAudioMidi };
};
