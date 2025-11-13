import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
} from 'standardized-audio-context';

import { audioContext } from '..';

export class OscillatorNode {
	private _oscillator = audioContext.current.createOscillator();
	private _transposeInput = audioContext.current.createConstantSource();
	private _tranposeGain = audioContext.current.createGain();
	private _peakGain = audioContext.current.createGain();

	constructor() {
		this._transposeInput.offset.setValueAtTime(0, audioContext.currentTime);
		this._tranposeGain.gain.setValueAtTime(100, audioContext.currentTime);

		this._transposeInput.connect(this._tranposeGain);
		this._tranposeGain.connect(this._oscillator.detune);
		this._oscillator.connect(this._peakGain);

		this._transposeInput.start();
		this._oscillator.start();
	}

	disconnect = () => {
		this._tranposeGain.disconnect(this._oscillator.detune);
		this._transposeInput.disconnect(this._tranposeGain);

		this._oscillator.stop();
		this._transposeInput.stop();

		(this as any)._oscillator = null;
		(this as any)._transposeInput = null;
		(this as any)._tranposeGain = null;
	};

	get waveform(): 'sine' | 'triangle' | 'square' | 'sawtooth' {
		return this._oscillator.type as any;
	}
	set waveform(value: 'sine' | 'triangle' | 'square' | 'sawtooth') {
		this._oscillator.type = value;
	}

	get frequency(): IAudioParam {
		return this._oscillator.frequency;
	}

	get transpose(): IAudioParam {
		return this._transposeInput.offset;
	}

	get detune(): IAudioParam {
		return this._oscillator.detune;
	}

	get peak(): IAudioParam {
		return this._peakGain.gain;
	}

	output = (): IAudioNode<IAudioContext> => this._peakGain;
}
