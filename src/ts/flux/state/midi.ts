
export interface MidiState {
	initialized: boolean;
	notesOn: Set<number>;
}

export const initialMidiState: MidiState = {
	initialized: false,
	notesOn: new Set<number>()
};
