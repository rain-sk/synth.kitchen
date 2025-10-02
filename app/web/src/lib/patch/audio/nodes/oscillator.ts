import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
	TOscillatorType,
} from 'standardized-audio-context';

import { audioContext } from '..';

export class OscillatorNode {
	private _oscillator = audioContext.createOscillator();
	private _detuneInput = audioContext.createGain();

	constructor() {
		this._detuneInput.gain.setValueAtTime(100, audioContext.currentTime);
		this._detuneInput.connect(this._oscillator.detune);
	}

	start = () => {
		this._oscillator.start();
	};

	disconnect = () => {
		this._detuneInput.disconnect(this._oscillator.detune);
		(this._oscillator as any) = null;
		(this._detuneInput as any) = null;
	};

	output = (): IAudioNode<IAudioContext> => this._oscillator;

	get waveform(): string {
		return this._oscillator.type;
	}

	set waveform(type: TOscillatorType) {
		this._oscillator.type = type;
	}

	frequency = (): IAudioParam => this._oscillator.frequency;
	detune = (): IAudioParam => this._oscillator.detune;
	detuneInput = (): IAudioParam => this._detuneInput as any as IAudioParam;
}
