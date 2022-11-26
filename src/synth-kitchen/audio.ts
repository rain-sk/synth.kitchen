import { AudioContext } from 'standardized-audio-context';

export const audioContext = new AudioContext();

let resume: any = () => {
	if ('resume' in audioContext) {
		document.removeEventListener('click', resume, false);
		document.removeEventListener('mousemove', resume, false);
		document.removeEventListener('touchmove', resume, false);
		document.removeEventListener('touchstart', resume, false);

		audioContext.resume();

		resume = undefined;
	} else {
		console.error('Unable to resume AudioContext');
	}
};

document.addEventListener('click', resume, false);
document.addEventListener('mousemove', resume, false);
document.addEventListener('touchmove', resume, false);
document.addEventListener('touchstart', resume, false);
