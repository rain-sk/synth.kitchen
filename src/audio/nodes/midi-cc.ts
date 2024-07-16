import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';
import { ControlChangeMessageEvent, PortEvent, WebMidi } from 'webmidi';
import { midi } from '../../midi';

export class MidiCcNode {
	private _node = new (AudioWorkletNode as any)(
		audioContext,
		'midi-cc'
	) as IAudioWorkletNode<IAudioContext>;
	private _inputName = '';
	private _cc: number = 32;

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
			this._node = null as any;
		}, 10);
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
			this.setInput(e.port.name);
		}
	};

	onDisconnected = (e: PortEvent) => {
		if (e.port === this.input) {
			this.setInput('');
		}
	};

	onCC = (e: ControlChangeMessageEvent) => {
		if (this.node() && this._cc === e.controller.number) {
			let newValue = 127;

			if (typeof e.value === 'number' && e.rawValue !== undefined) {
				newValue = e.rawValue;
			} else if (typeof e.rawValue === 'boolean') {
				newValue = e.value ? 127 : 0;
			} else {
				newValue = 0;
			}

			this.node()
				.parameters.get('value')
				?.setTargetAtTime(newValue, audioContext.currentTime, 0.03);
		}
	};
}
