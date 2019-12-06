import { AudioContext } from 'standardized-audio-context';

export const audioContext = new AudioContext({
	latencyHint: 'playback'
});

export const masterBuss = audioContext.createDynamicsCompressor();
masterBuss.threshold.setValueAtTime(-20, audioContext.currentTime);
masterBuss.knee.setValueAtTime(40, audioContext.currentTime);
masterBuss.ratio.setValueAtTime(12, audioContext.currentTime);
masterBuss.attack.setValueAtTime(0, audioContext.currentTime);
masterBuss.release.setValueAtTime(0.25, audioContext.currentTime);
masterBuss.connect(audioContext.destination);

let resumed = false;
function resume() {
	document.removeEventListener('mousemove', resume, false);
	document.removeEventListener('touchmove', resume, false);
	document.removeEventListener('touchstart', resume, false);
	if (!resumed) {
		resumed = true;
		audioContext.resume();
	}
}

document.addEventListener('mousemove', resume, false);
document.addEventListener('touchmove', resume, false);
document.addEventListener('touchstart', resume, false);