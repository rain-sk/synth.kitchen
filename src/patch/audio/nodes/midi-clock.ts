import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { audioContext } from '../';
import { PortEvent, WebMidi } from 'webmidi';
import { midi } from '../../midi';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class MidiClockNode {
	private _node = audioWorkletNodeFactory('midi-clock');
	private _inputName = '';
	private _tick = -1;

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
			oldInput.removeListener('clock', this.onClock);
			oldInput.removeListener('start', this.onStart);
			oldInput.removeListener('stop', this.onStop);
		}

		if (this.input) {
			this.input.addListener('clock', this.onClock);
			this.input.addListener('start', this.onStart);
			this.input.addListener('stop', this.onStop);
		}
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

	onClock = () => {
		if (this._tick >= 0) {
			if (this._tick === 0) {
				this.node().port.postMessage('tick');
			}

			this._tick = (this._tick + 1) % 24;
		}
	};

	onStart = () => {
		this.node().port.postMessage('start');
	};

	onStop = () => {
		this.node().port.postMessage('stop');
	};
}
