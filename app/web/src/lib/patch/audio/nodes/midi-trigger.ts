import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { Listener, NoteMessageEvent, PortEvent, WebMidi } from 'webmidi';

import { audioContext } from '..';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';
import { midi } from '../../midi';

export class MidiTriggerNode {
	private _node = audioWorkletNodeFactory('midi-clock');
	private _inputName = '';
	private _active = false;
	private _listener: Listener | Listener[] | undefined;
	private _note: 'all' | number = 'all';

	constructor() {
		if (midi.initialized) {
			WebMidi.addListener('connected', this.onConnected);
			WebMidi.addListener('disconnected', this.onDisconnected);

			if (WebMidi.inputs.length > 0) {
				this.setInput(WebMidi.inputs[0].name);
			}
		}
	}

	disconnect = () => {
		this.disconnectFromInput();
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
		(this as any)._node = null;
	};

	disconnectFromInput = () => {
		if (this._listener) {
			if (Array.isArray(this._listener)) {
				this._listener.forEach((listener) => listener.remove());
			} else {
				this._listener.remove();
			}
			this._listener = undefined;
		}
		this._active = false;
	};

	connectToInput = () => {
		if (this.input) {
			this._listener = this.input.addListener('noteon', this.onTrigger);
		}
	};

	output = (): IAudioWorkletNode<IAudioContext> => this._node;

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
		this.disconnectFromInput();
		this._inputName = name;
		this.connectToInput();
	};

	setNote = (note: 'all' | number) => {
		this._note = note;
	};

	onConnected = (e: PortEvent) => {
		if (!this._active && e.port.name === this._inputName) {
			this.connectToInput();
		} else if (e.port.type === 'input' && !this.input) {
			this._inputName = e.port.name;
			this.connectToInput();
		}
	};

	onDisconnected = (e: PortEvent) => {
		if (e.port === this.input) {
			this.disconnectFromInput();
		}
	};

	onTrigger = (e: NoteMessageEvent) => {
		if (this._note === 'all' || this._note === e.note.number) {
			const tick = this._node.parameters.get('tick');
			tick?.setValueAtTime(
				tick.value ? -tick.value : 1,
				audioContext.currentTime,
			);
		}
	};
}
