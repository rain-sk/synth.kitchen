import { MidiAction } from '.';

export function midiStopNote(id: number): { type: MidiAction & 'MIDI_STOP_NOTE', payload: { id: number } } {
	return {
		type: 'MIDI_STOP_NOTE',
		payload: {
			id
		}
	};
}
