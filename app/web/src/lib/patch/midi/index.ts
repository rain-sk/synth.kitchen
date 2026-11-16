import { WebMidi } from 'webmidi';

export const midi = {
	initialized: false,
	setupError: '',
};

/**
 * requestMIDIAccess() can hang forever when there is no MIDI service or a
 * permission prompt goes unanswered. The patch editor is gated behind
 * initMidi(), so that hang keeps the editor from ever opening.
 */
export const MIDI_INIT_TIMEOUT_MS = 2500;

export const initMidi = async () => {
	const enabled = WebMidi.enable()
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

	// Stop waiting on MIDI, but don't cancel it: if WebMidi answers after the
	// timeout, the chain above still marks MIDI as initialized.
	await Promise.race([
		enabled,
		new Promise((resolve) => setTimeout(resolve, MIDI_INIT_TIMEOUT_MS)),
	]);
};
