import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
} from 'standardized-audio-context';
import {
	ControlChangeMessageEvent,
	Listener,
	PortEvent,
	WebMidi,
} from 'webmidi';

import { audioContext } from '..';
import { midi } from '../../midi';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class MidiCcNode {
	private _node = audioWorkletNodeFactory('midi-cc');
	private _inputName = '';
	private _cc: number = 32;
	private _channel: number = 1;
	private _active = false;
	private _listener: Listener | Listener[] | undefined;

	constructor() {
		if (midi.initialized) {
			WebMidi.addListener('connected', this.onConnected);
			WebMidi.addListener('disconnected', this.onDisconnected);

			this.handleCCValue(0);
			if (WebMidi.inputs.length > 0) {
				this.inputName = WebMidi.inputs[0].name;
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

	output = (): IAudioNode<IAudioContext> => this._node;

	get inputName() {
		return this._inputName;
	}

	get cc() {
		return this._cc;
	}

	set cc(cc: number) {
		this._cc = cc;
	}

	get channel() {
		return this._channel;
	}

	setConfig = (config: { cc: number; channel: number; inputName: string }) => {
		this.disconnectFromInput();
		this._cc = config.cc;
		this._channel = config.channel;
		this._inputName = config.inputName;
		this.connectToInput();
	};

	get max(): IAudioParam {
		return this._node.parameters.get('max') as IAudioParam;
	}

	get min(): IAudioParam {
		return this._node.parameters.get('min') as IAudioParam;
	}

	get input() {
		if (!this._inputName) {
			return undefined;
		}

		return WebMidi.inputs.find((input) => input.name === this._inputName);
	}

	get inputChannel() {
		if (!this._inputName || !this._channel) {
			return undefined;
		}

		return WebMidi.inputs.find((input) => input.name === this._inputName)
			?.channels[this._channel];
	}

	set inputName(name: string) {
		this.disconnectFromInput();
		this._inputName = name;
		this.connectToInput();
	}

	set channel(channel: number) {
		this.disconnectFromInput();
		this._channel = channel;
		this.connectToInput();
	}

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
		if (this.inputChannel) {
			this._listener = this.inputChannel.addListener(
				'controlchange',
				this.onCC,
			);
			this._active = true;
		}
	};

	onConnected = (e: PortEvent) => {
		if (!this._active && e.port.name === this._inputName) {
			this.connectToInput();
		} else if (e.port.type === 'input' && !this.input) {
			this.inputName = e.port.name;
			this.connectToInput();
		}
	};

	onDisconnected = (e: PortEvent) => {
		if (e.port === this.input) {
			this.disconnectFromInput();
		}
	};

	handleCCValue = (value: number) => {
		this._node.parameters
			.get('value')
			?.setValueAtTime(value, audioContext.currentTime);
	};

	onCC = (e: ControlChangeMessageEvent) => {
		if (this._active && this._cc === e.controller.number) {
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
