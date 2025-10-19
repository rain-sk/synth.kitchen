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
import { ShiftNode } from './shift';

export class MidiCcNode {
	private _control = audioContext.current.createConstantSource();
	private _shift = new ShiftNode();
	private _inputName = '';
	private _cc: number = 32;
	private _channel: number = 1;
	private _active = false;
	private _listener: Listener | Listener[] | undefined;

	constructor() {
		if (midi.initialized) {
			this._control.connect(this._shift.io());
			this._control.start();

			this._shift.inputMin.setValueAtTime(0, audioContext.currentTime);
			this._shift.inputMax.setValueAtTime(1, audioContext.currentTime);
			this._shift.outputMin.setValueAtTime(0, audioContext.currentTime);
			this._shift.outputMax.setValueAtTime(1, audioContext.currentTime);

			WebMidi.addListener('connected', this.onConnected);
			WebMidi.addListener('disconnected', this.onDisconnected);

			this.handleCCValue(0);

			if (WebMidi.inputs.length > 0) {
				this.setInputName(WebMidi.inputs[0].name);
			}
		}
	}

	disconnect = () => {
		this.disconnectFromInput();
		this._control.disconnect(this._shift.io());
		this._control.stop();
		this._shift.disconnect();
		(this as any)._control = null;
		(this as any)._shift = null;
	};

	output = (): IAudioNode<IAudioContext> => this._control;

	get inputName() {
		return this._inputName;
	}

	get cc() {
		return this._cc;
	}

	get channel() {
		return this._channel;
	}

	get max(): IAudioParam | undefined {
		return this._shift.outputMax;
	}

	get min(): IAudioParam | undefined {
		return this._shift.outputMin;
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

	setInputName = (name: string) => {
		this.disconnectFromInput();
		this._inputName = name;
		this.connectToInput();
	};

	setCC = (cc: number) => {
		this.disconnectFromInput();
		this._cc = cc;
		this.connectToInput();
	};

	setChannel = (channel: number) => {
		this.disconnectFromInput();
		this._channel = channel;
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
	};

	connectToInput = () => {
		if (this.inputChannel) {
			this._listener = this.inputChannel.addListener(
				'controlchange',
				this.onCC,
			);
		}
	};

	onConnected = (e: PortEvent) => {
		if (!this._active && e.port.name === this._inputName) {
			this._active = true;
			this.connectToInput();
		} else if (e.port.type === 'input' && !this.input) {
			this._active = true;
			this.setInputName(e.port.name);
		}
	};

	onDisconnected = (e: PortEvent) => {
		if (e.port === this.input) {
			this._active = false;
			this.disconnectFromInput();
		}
	};

	handleCCValue = (value: number) => {
		this._control.offset.setTargetAtTime(
			value / 127,
			audioContext.currentTime,
			0.003,
		);
	};

	onCC = (e: ControlChangeMessageEvent) => {
		if (this._cc === e.controller.number) {
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
