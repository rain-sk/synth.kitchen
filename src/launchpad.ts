import * as WebMIDI from 'webmidi';
import { hasAccidental } from 'music-fns';
import { chromatic } from 'src';

const RED = 9;
const YELLOW = 19;
const RAINBOW_START = 4;

function chromaticColor(note: number): number {
	return (hasAccidental(chromatic(note).name)
		? RED
		: YELLOW
	);
}

const LAUNCHPAD_NAME = 'Launchpad MK2';

export class Launchpad {
	private _input: any;
	private _output: any;
	private _initTimeout: NodeJS.Timeout;
	constructor(private initCallback: () => void, private noteonCallback: (e: any) => void, private noteoffCallback: (e: any) => void) {
		if (!WebMIDI.enabled) {
			WebMIDI.enable((err) => {
				if (!!err) {
					console.error(err);
				} else {
					this._initTimeout = setInterval(this.init, 100);
					this.init();
				}
			});
		} else {
			this._initTimeout = setInterval(this.init, 500);
			this.init();
		}
	}
	private init() {
		const input = WebMIDI.inputs.find(input => input.name === LAUNCHPAD_NAME);
		const output = WebMIDI.outputs.find(output => output.name === LAUNCHPAD_NAME);
		if (!!input && !!output) {
			this._input = input;
			this._output = output;
			this.initCallback();
			clearInterval(this._initTimeout);

			this._input.addListener('noteon', 'all', (e: any) => {
				this.noteonCallback(e);
			});

			this._input.addListener('noteoff', 'all', (e: any) => {
				this.noteoffCallback(e);
			});

			for (let i = 1; i < 9; i++) {
				for (let j = 1; j < 9; j++) {
					this.stopNote(parseInt(`${i}${j}`));
				}
			}
		} else {
			console.error('Failed to initialize Launchpad MK2, trying again...');
		}
	}
	playNote(note: number, color: number = Math.floor(128 * Math.random())) {

		if (!!this._input) this._output.send(250, [144, note, color]);
	}
	stopNote(note: number) {
		for (let i = 0; i < 10; i++) {
			setTimeout(() => {
				if (i < 9)
					this._output.send(250, [144, note, RAINBOW_START + 8 * i]);
				else
					this._output.send(250, [144, note, chromaticColor(note)]);
			}, ((Math.sqrt(i)) * 200));
		}
	}
}