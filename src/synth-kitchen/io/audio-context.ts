import { Audio } from 'audio-om';

export const audio = new Audio();

// from: https://codepen.io/andremichelle/pen/WbqrYN/
export const mainBussKey = audio.createDynamicsCompressor();
audio.node(mainBussKey).threshold.setValueAtTime(-6, audio.context.currentTime); // this is the pitfall, leave some headroom
audio.node(mainBussKey).knee.setValueAtTime(5, audio.context.currentTime); // brute force
audio.node(mainBussKey).ratio.setValueAtTime(3, audio.context.currentTime); // max compression
audio.node(mainBussKey).attack.setValueAtTime(0, audio.context.currentTime); // 5ms attack
audio.node(mainBussKey).release.setValueAtTime(0.25, audio.context.currentTime); // 50ms release

audio.node(mainBussKey).connect(audio.context.destination);

let resumed = false;

function resume() {
	if (!resumed) {
		resumed = true;

		document.removeEventListener('mousemove', resume, false);
		document.removeEventListener('touchmove', resume, false);
		document.removeEventListener('touchstart', resume, false);

		if ('resume' in audio.context) {
			audio.context.resume();
		};
	}
}

document.addEventListener('mousemove', resume, false);
document.addEventListener('touchmove', resume, false);
document.addEventListener('touchstart', resume, false);