import { AudioContext } from 'standardized-audio-context';
import { initAudioProcessors } from './processors';

export const audio = {
	initialized: false
};

export const audioContext = new AudioContext();

const resumeAudioContext = new Promise<void>((resolve) => {
	const startButton = document.getElementById('start');
	startButton?.focus();
	startButton?.addEventListener('click', () => {
		if ('resume' in audioContext) {
			audioContext.resume().then(() => {
				resolve();
			});
		} else {
			throw 'Unable to initialize audio';
		}
	});
});

export const initAudio = async () => {
	return resumeAudioContext.then(initAudioProcessors(audioContext)).then(() => {
		audio.initialized = true;
	});
};
