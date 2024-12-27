import { audioContext } from './context';
import { initAudioProcessors } from './processors';

export const audio = {
	initialized: false
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
	return resumeAudioContext.then(initAudioProcessors(audioContext)).then(() => {
		audio.initialized = true;
	});
};
