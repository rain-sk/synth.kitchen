import { WebMidi } from 'webmidi';

export const midi = {
	initialized: false,
	setupError: ''
};

export const initMidi = async () => {
	const status = document.getElementById('status');
	status && (status.innerText = 'starting midi');
	return WebMidi.enable()
		.catch((err: string) => {
			midi.setupError = err;
		})
		.then(() => {
			if (midi.setupError) {
				console.error(midi.setupError);
			} else {
				midi.initialized = true;
			}
		});
};
