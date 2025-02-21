import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { ControlChangeMessageEvent, PortEvent, WebMidi } from 'webmidi';

import { audioContext } from '../';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';
import { midi } from '../../midi';

export class MidiCcNode {
	private _node = audioWorkletNodeFactory('midi-cc');
	private _inputName = '';
	private _cc: number = 32;

	constructor() {
		if (midi.initialized) {
			WebMidi.addListener('connected', this.onConnected);
			WebMidi.addListener('disconnected', this.onDisconnected);

			if (WebMidi.inputs.length > 0) {
				this.setInputName(WebMidi.inputs[0].name);
			}

			this.handleCCValue(0);
		}
	}

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get inputName() {
		return this._inputName;
	}

	get cc() {
		return this._cc;
	}

	get max() {
		return this.node().parameters.get('max')?.value ?? 1;
	}

	get min() {
		return this.node().parameters.get('min')?.value ?? 0;
	}

	get input() {
		for (let input of WebMidi.inputs) {
			if (input.name === this._inputName) {
				return input;
			}
		}
		return null;
	}

	setInputName = (name: string) => {
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
			oldInput.removeListener('controlchange', this.onCC);
		}

		if (this.input) {
			this.input.addListener('controlchange', this.onCC);
		}
	};

	setCC = (cc: number) => {
		this._cc = cc;
	};

	setMax = (max: number) => {
		this.node()
			.parameters.get('max')
			?.setTargetAtTime(max, audioContext.currentTime, 0.03);
	};

	setMin = (min: number) => {
		this.node()
			.parameters.get('min')
			?.setTargetAtTime(min, audioContext.currentTime, 0.03);
	};

	onConnected = (e: PortEvent) => {
		if (e.port.type === 'input' && !this.input) {
			this.setInputName(e.port.name);
		}
	};

	onDisconnected = (e: PortEvent) => {
		if (e.port === this.input) {
			this.setInputName('');
		}
	};

	handleCCValue = (value: number) => {
		this.node()
			.parameters.get('value')
			?.setTargetAtTime(value, audioContext.currentTime, 0.03);
	};

	onCC = (e: ControlChangeMessageEvent) => {
		if (this.node() && this._cc === e.controller.number) {
			if (typeof e.value === 'number' && e.rawValue !== undefined) {
				this.handleCCValue(e.rawValue);
			} else if (typeof e.rawValue === 'boolean') {
				this.handleCCValue(e.value ? 127 : 0);
			} else {
				this.handleCCValue(0);
			}
		}
	};
}
