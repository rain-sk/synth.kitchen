import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
} from 'standardized-audio-context';

import { audioContext } from '..';

export class FilterNode {
	private _filter = audioContext.current.createBiquadFilter();
	private _transposeInput = audioContext.current.createConstantSource();
	private _tranposeGain = audioContext.current.createGain();

	constructor() {
		this._transposeInput.offset.setValueAtTime(0, audioContext.currentTime);
		this._tranposeGain.gain.setValueAtTime(100, audioContext.currentTime);

		this._transposeInput.connect(this._tranposeGain);
		this._tranposeGain.connect(this._filter.detune);

		this._transposeInput.start();
	}

	disconnect = () => {
		this._tranposeGain.disconnect(this._filter.detune);
		this._transposeInput.disconnect(this._tranposeGain);

		this._transposeInput.stop();

		(this as any)._oscillator = null;
		(this as any)._transposeInput = null;
		(this as any)._tranposeGain = null;
	};

	get type():
		| 'allpass'
		| 'bandpass'
		| 'highpass'
		| 'highshelf'
		| 'lowpass'
		| 'lowshelf'
		| 'notch'
		| 'peaking' {
		return this._filter.type as any;
	}
	set type(
		value:
			| 'allpass'
			| 'bandpass'
			| 'highpass'
			| 'highshelf'
			| 'lowpass'
			| 'lowshelf'
			| 'notch'
			| 'peaking',
	) {
		this._filter.type = value;
	}

	get frequency(): IAudioParam {
		return this._filter.frequency;
	}

	get transpose(): IAudioParam {
		return this._transposeInput.offset;
	}

	get detune(): IAudioParam {
		return this._filter.detune;
	}

	get Q(): IAudioParam {
		return this._filter.Q;
	}

	get gain(): IAudioParam {
		return this._filter.gain;
	}

	input = (): IAudioNode<IAudioContext> => this._filter;
	output = (): IAudioNode<IAudioContext> => this._filter;
}
