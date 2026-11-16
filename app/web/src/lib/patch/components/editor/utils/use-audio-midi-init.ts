import { useCallback, useRef, useState } from 'react';
import { createGlobalState } from 'react-use';

import { audioContext, initAudio } from '../../../audio';
import { initMidi } from '../../../midi';

const audioInitialized = () => audioContext.current.state === 'running';

const useAudioInitialized = createGlobalState(audioInitialized);
const useAudioInitializedStatus = createGlobalState('');

export const useAudioMidiInit = () => {
	const [initialized, setInitialized] = useAudioInitialized();
	const [status, setStatus] = useAudioInitializedStatus();
	const [askWithoutMidi, setAskWithoutMidi] = useState(false);

	const initCalledRef = useRef(false);

	const start = useCallback(() => {
		setAskWithoutMidi(false);
		setStatus('');
		setInitialized(true);
	}, [setInitialized, setStatus]);

	const initAudioMidi = useCallback(async () => {
		if (initCalledRef.current) {
			return;
		}
		initCalledRef.current = true;

		setStatus('starting audio');

		try {
			await initAudio();
		} catch (e) {
			console.error(e);
			setStatus('audio failed to start');
			initCalledRef.current = false;
			return;
		}

		setStatus('starting midi');

		const outcome = await initMidi(start);
		initCalledRef.current = false;

		if (outcome === 'waiting') {
			setAskWithoutMidi(true);
			setStatus('');
		} else {
			start();
		}
	}, [setStatus, start]);

	return {
		initialized,
		status,
		askWithoutMidi,
		initAudioMidi,
		startWithoutMidi: start,
	};
};
