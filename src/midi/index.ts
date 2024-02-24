import { WebMidi } from 'webmidi';

export const midi = {
	initialized: false,
	setupError: ''
};

export const initMidi = async () => {
	return WebMidi.enable()
		.catch((err: string) => {
			midi.setupError = err;
		})
		.then(() => {
			if (midi.setupError) {
				alert(midi.setupError);
			}
			midi.initialized = true;
		});
};
