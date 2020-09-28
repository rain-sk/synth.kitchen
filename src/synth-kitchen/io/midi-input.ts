export class MidiInput {
	constructor(
		public id: string,
		public moduleKey: string,
		public noteOnCallback: (note: number) => void,
		public noteOffCallback: (note: number) => void) {

	}
}