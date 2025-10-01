import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
	IGainNode,
} from 'standardized-audio-context';

import { audioContext, resampling } from '..';
import { LimiterNode } from './limiter';

export class OutputNode {
	private _input = audioContext.current.createGain();
	private _gain = audioContext.current.createGain();
	private _delay = resampling;
	private _limiter = new LimiterNode();

	constructor() {
		this._input.connect(this._gain);
		this._gain.connect(this._limiter.input());
		this._limiter.output().connect(this._delay.current);
		this._delay.current.connect(audioContext.current.destination);
	}

	disconnect = () => {
		this._input.disconnect(this._gain);
		this._gain.disconnect(this._limiter.input());
		this._limiter.output().disconnect(this._delay.current);
		this._limiter.disconnect();
	};

	speaker = (): IGainNode<IAudioContext> => this._input;
	resampling = (): IAudioNode<IAudioContext> => this._delay.current;

	get gain(): IAudioParam {
		return this._gain.gain;
	}
}
