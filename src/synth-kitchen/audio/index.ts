import { AudioContext } from 'standardized-audio-context';

export const audio = {
	initialized: false
};

export const audioContext = new AudioContext();

export const initAudio = async () => {
	return new Promise<void>((resolve) => {
		const resume: any = () => {
			document.removeEventListener('click', resume, false);
			document.removeEventListener('mousemove', resume, false);
			document.removeEventListener('touchmove', resume, false);
			document.removeEventListener('touchstart', resume, false);

			if ('resume' in audioContext) {
				audioContext.resume().then(() => {
					audio.initialized = true;
					resolve();
				});
			} else {
				console.error('Unable to resume AudioContext');
			}
		};

		document.addEventListener('click', resume, false);
		document.addEventListener('mousemove', resume, false);
		document.addEventListener('touchmove', resume, false);
		document.addEventListener('touchstart', resume, false);
	});
};
