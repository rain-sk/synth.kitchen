import { WebMidi } from 'webmidi';

export const midi = {
	initialized: false,
	setupError: '',
};

export const initMidi = async () => {
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
