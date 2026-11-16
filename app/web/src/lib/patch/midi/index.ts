import { WebMidi } from 'webmidi';

export const midi = {
	initialized: false,
	setupError: '',
	waiting: false,
};

export const MIDI_TIMEOUT_MS = 5000;

export type MidiInitOutcome = 'ready' | 'failed' | 'waiting';

export const initMidi = async (
	onLate: (outcome: 'ready' | 'failed') => void = () => {},
): Promise<MidiInitOutcome> => {
	midi.waiting = true;

	const settled = WebMidi.enable()
		.then(() => {
			midi.setupError = '';
			midi.initialized = true;
			midi.waiting = false;
			return 'ready' as const;
		})
		.catch((err: unknown) => {
			midi.setupError = `${err}`;
			midi.initialized = false;
			midi.waiting = false;
			console.error(`MIDI unavailable: ${midi.setupError}`);
			return 'failed' as const;
		});

	const outcome = await Promise.race([
		settled,
		new Promise<'waiting'>((resolve) =>
			setTimeout(resolve, MIDI_TIMEOUT_MS, 'waiting'),
		),
	]);

	if (outcome === 'waiting') {
		settled.then((late) => onLate(late));
	}

	return outcome;
};
