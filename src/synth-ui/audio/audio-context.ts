export const audioContext = new AudioContext();

function resume() {
	document.removeEventListener('mousemove', resume, false);
	audioContext.resume();
}

document.addEventListener('mousemove', resume, false);