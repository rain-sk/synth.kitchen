import { MidiAction } from '.';

export function midiPlayNote(id: number): { type: MidiAction & 'MIDI_PLAY_NOTE', payload: { id: number } } {
	return {
		type: 'MIDI_PLAY_NOTE',
		payload: {
			id
		}
	};
}
