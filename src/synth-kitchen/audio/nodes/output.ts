import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
	IGainNode
} from 'standardized-audio-context';
import { audioContext } from '../context';
import { LimiterNode } from './limiter';

export class OutputNode {
	private _gain = audioContext.createGain();
	private _delay = audioContext.createDelay();
	private _limiter = new LimiterNode();

	constructor() {
		this._delay.delayTime.value = 256 / audioContext.sampleRate;

		this._gain.connect(this._limiter.input());
		this._gain.connect(this._delay.delayTime);
		this._limiter.output().connect(audioContext.destination);
	}

	disconnect = () => {
		setTimeout(() => {
			this._gain.disconnect(this._limiter.input());
			this._gain.disconnect(this._delay.delayTime);
			this._limiter.output().disconnect(audioContext.destination);
			this._gain = null as any;
			this._delay = null as any;
			this._limiter = null as any;
		}, 200);
	};

	speaker = (): IGainNode<IAudioContext> => this._gain;
	resampling = (): IAudioNode<IAudioContext> => this._delay;

	get gain(): IAudioParam {
		return this._gain.gain;
	}
}
