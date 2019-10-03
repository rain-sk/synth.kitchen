export const audioContext = new AudioContext();

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