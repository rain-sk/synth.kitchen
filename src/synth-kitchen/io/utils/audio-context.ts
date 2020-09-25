import { AudioContext } from 'standardized-audio-context';

export const audioContext = new AudioContext({
	latencyHint: 'playback'
});

// from: https://codepen.io/andremichelle/pen/WbqrYN/
export const masterBuss = audioContext.createDynamicsCompressor();
masterBuss.threshold.setValueAtTime(-6, audioContext.currentTime); // this is the pitfall, leave some headroom
masterBuss.knee.setValueAtTime(5, audioContext.currentTime); // brute force
masterBuss.ratio.setValueAtTime(3, audioContext.currentTime); // max compression
masterBuss.attack.setValueAtTime(0, audioContext.currentTime); // 5ms attack
masterBuss.release.setValueAtTime(0.25, audioContext.currentTime); // 50ms release

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