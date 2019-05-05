import { MidiAction } from '.';

export function midiInitialize(): { type: MidiAction & 'MIDI_INITIALIZE' } {
	return {
		type: 'MIDI_INITIALIZE'
	};
}
