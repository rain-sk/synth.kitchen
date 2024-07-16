import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';
import { PortEvent, WebMidi } from 'webmidi';
import { midi } from '../../midi';

export class MidiTriggerNode {
	private _node = new (AudioWorkletNode as any)(
		audioContext,
		'midi-clock'
	) as IAudioWorkletNode<IAudioContext>;
	private _inputName = '';

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
			this._node = null as any;
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
			oldInput.removeListener('noteon', this.onTrigger);
			oldInput.removeListener('start', this.onStart);
			oldInput.removeListener('stop', this.onStop);
		}

		if (this.input) {
			this.input.addListener('noteon', this.onTrigger);
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

	onTrigger = () => {
		this.node().port.postMessage('tick');
	};

	onStart = () => {
		this.node().port.postMessage('start');
	};

	onStop = () => {
		this.node().port.postMessage('stop');
	};
}
