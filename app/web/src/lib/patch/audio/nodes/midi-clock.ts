import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { Listener, PortEvent, WebMidi } from 'webmidi';

import { audioContext } from '..';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';
import { midi } from '../../midi';

export class MidiClockNode {
	private _node = audioWorkletNodeFactory('midi-clock');
	private _inputName = '';
	private _tick = -1;
	private _active = false;
	private _listener: Listener | Listener[] | undefined;

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

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get inputName() {
		return this._inputName;
	}

	get input() {
		return WebMidi.inputs.find((input) => input.name === this._inputName);
	}

	setInput = (name: string) => {
		this.disconnectFromInput();
		this._inputName = WebMidi.inputs.some((input) => input.name === name)
			? name
			: '';
		this.connectToInput();
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
		this._tick = -1;
	};

	connectToInput = () => {
		if (this.input) {
			this._listener = this.input.addListener('clock', this.onClock);
		}
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

	onClock = () => {
		this._tick = (this._tick + 1) % 24;
		if (this._tick === 0) {
			const tick = this._node.parameters.get('tick');
			tick?.setValueAtTime(
				tick.value ? -tick.value : 1,
				audioContext.currentTime,
			);
		}
	};
}
