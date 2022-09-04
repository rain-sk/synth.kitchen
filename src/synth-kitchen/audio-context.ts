import { AudioContext } from "standardized-audio-context";

export const audioContext = new AudioContext();

let resume: any = () => {
	document.removeEventListener('mousemove', resume, false);
	document.removeEventListener('touchmove', resume, false);
	document.removeEventListener('touchstart', resume, false);

	if ('resume' in audioContext) {
        audioContext.resume();
        console.log(audioContext);
	}

	resume = undefined;
};

document.addEventListener('mousemove', resume, false);
document.addEventListener('touchmove', resume, false);
document.addEventListener('touchstart', resume, false);
