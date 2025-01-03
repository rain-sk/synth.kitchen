import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { NoteMessageEvent, PortEvent, WebMidi } from 'webmidi';

import { audioContext } from '../';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';
import { midi } from '../../midi';

export class MidiTriggerNode {
	private _node = audioWorkletNodeFactory('midi-clock');
	private _inputName = '';
	private _note: 'all' | number = 'all';

	constructor() {
		if (midi.initialized) {
			WebMidi.addListener('connected', this.onConnected);
			WebMidi.addListener('disconnected', this.onDisconnected);

			if (WebMidi.inputs.length === 1) {
				this.setInput(WebMidi.inputs[0].name);
			}
		}
	}

	disconnect = () => {
		setTimeout(() => {
			this._node.parameters
				.get('active')
				?.setValueAtTime(0, audioContext.currentTime);
		}, 10);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get inputName() {
		return this._inputName;
	}

	get note() {
		return this._note;
	}

	get input() {
		for (let input of WebMidi.inputs) {
			if (input.name === this._inputName) {
				return input;
			}
		}
		return null;
	}

	setInput = (name: string) => {
		const oldInput = this.input;

		this._inputName = '';
		if (name) {
			for (let input of WebMidi.inputs) {
				if (input.name === name) {
					this._inputName = name;
					break;
				}
			}
		}

		if (oldInput) {
			oldInput.removeListener('noteon', this.onTrigger);
		}

		if (this.input) {
			this.input.addListener('noteon', this.onTrigger);
		}
	};

	setNote = (note: 'all' | number) => {
		this._note = note;
	};

	onConnected = (e: PortEvent) => {
		if (e.port.type === 'input' && !this.input) {
			this.setInput(e.port.name);
		}
	};

	onDisconnected = (e: PortEvent) => {
		if (e.port === this.input) {
			this.setInput('');
		}
	};

	onTrigger = (e: NoteMessageEvent) => {
		if (this._note === 'all' || this._note === e.note.number) {
			this.node().port.postMessage('tick');
		}
	};
}
