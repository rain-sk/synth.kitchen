import { AudioContext } from 'standardized-audio-context';
import { connect } from 'extendable-media-recorder-wav-encoder';

import { initAudioProcessors } from './processors';
import { register } from 'extendable-media-recorder';

export const audioContext = new AudioContext();

export const resampling = audioContext.createDelay();
resampling.delayTime.value = 256 / audioContext.sampleRate;

export const audio = {
	initialized: false,
};

const resumeAudioContext = new Promise<void>((resolve) => {
	const startButton = document.getElementById('start');
	startButton?.focus();

	const init = () => {
		const status = document.getElementById('status');
		status && (status.innerText = 'starting audio');

		startButton?.removeEventListener('click', init);
		startButton && startButton.setAttribute('disabled', 'disabled');
		if ('resume' in audioContext) {
			audioContext.resume().then(() => {
				resolve();
			});
		} else {
			throw 'Unable to initialize audio';
		}
	};
	startButton?.addEventListener('click', init);

	const keyInit = (e: KeyboardEvent) => {
		if (e.key === ' ' || e.key === 'Enter') {
			document.removeEventListener('keydown', keyInit, false);
			init();
		}
	};

	document.addEventListener('keydown', keyInit, false);
});

export const initAudio = async () => {
	await register(await connect());
	return resumeAudioContext.then(initAudioProcessors(audioContext)).then(() => {
		audio.initialized = true;
	});
};
