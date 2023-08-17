import { AudioContext } from 'standardized-audio-context';
import { initAudioProcessors } from './processors';

export const audio = {
	initialized: false
};

export const audioContext = new AudioContext();

const resumeAudioContext = new Promise<void>((resolve) => {
	const startButton = document.getElementsByTagName('button')[0];
	startButton.focus();
	startButton.addEventListener('click', () => {
		if ('resume' in audioContext) {
			audioContext.resume().then(() => {
				resolve();
			});
		}
	});
});

export const initAudio = async () => {
	return resumeAudioContext.then(initAudioProcessors(audioContext)).then(() => {
		audio.initialized = true;
	});
};
