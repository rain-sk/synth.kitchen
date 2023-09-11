import { audioContext } from './context';
import { initAudioProcessors } from './processors';

export const audio = {
	initialized: false
};

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
