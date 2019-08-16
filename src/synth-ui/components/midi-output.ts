import { MidiInput } from "./midi-input";
import webmidi from "webmidi";

export class MidiOutput {
	private _connections: Map<string, MidiInput> = new Map<string, MidiInput>();
	private _input: any;
	private _channel = 'all';
	constructor() {
		this._handleNoteOn = this._handleNoteOn.bind(this);
		this._handleNoteOff = this._handleNoteOff.bind(this);
		this._input = webmidi.inputs[0];
		if (this._input) {
			this._input.addListener('noteon', this._channel, this._handleNoteOn);
			this._input.addListener('noteoff', this._channel, this._handleNoteOff);
		}
	}
	public switchInputDevice(to: string) {
		this._input.removeListener('noteon', this._channel, this._handleNoteOn);
		this._input.removeListener('noteoff', this._channel, this._handleNoteOff);
		this._input = webmidi.inputs.find((input: any) => input.name === to);
		this._input.addListener('noteon', this._channel, this._handleNoteOn);
		this._input.addListener('noteoff', this._channel, this._handleNoteOff);
	}
	public switchInputChannel(to: string) {
		this._input.removeListener('noteon', this._channel, this._handleNoteOn);
		this._input.removeListener('noteoff', this._channel, this._handleNoteOff);
		this._channel = to;
		this._input.addListener('noteon', this._channel, this._handleNoteOn);
		this._input.addListener('noteoff', this._channel, this._handleNoteOff);
	}
	public connect(to: MidiInput) {
		this._connections.set(to.id, to);
	}
	public disconnect(from: MidiInput) {
		this._connections.delete(from.id);
	}
	private _handleNoteOn(e: any) {
		Array.from(this._connections).forEach(([, connection]) => {
			connection.noteOnCallback(e.note.number)
		})
	}
	private _handleNoteOff(e: any) {
		Array.from(this._connections).forEach(([, connection]) => {
			connection.noteOffCallback(e.note.number)
		})
	}
}
