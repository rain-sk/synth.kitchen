import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
	IGainNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class OutputNode {
	private _gain = audioContext.createGain();
	private _delay = audioContext.createDelay();
	private _limiter1 = audioContext.createDynamicsCompressor();
	private _limiter2 = audioContext.createDynamicsCompressor();
	private _limiter3 = audioContext.createDynamicsCompressor();
	private _limiter4 = audioContext.createDynamicsCompressor();

	constructor() {
		this._delay.delayTime.value = 256 / audioContext.sampleRate;

		this._limiter1.threshold.value = -6;
		this._limiter1.ratio.value = 1000000000000000000000000000000000000;
		this._limiter1.attack.value = 0.001;
		this._limiter1.release.value = 0.01;

		this._limiter2.threshold.value = -5;
		this._limiter2.ratio.value = 1000000000000000000000000000000000000;
		this._limiter2.attack.value = 0;
		this._limiter2.release.value = 0.01;

		this._limiter3.threshold.value = -4;
		this._limiter3.ratio.value = 1000000000000000000000000000000000000;
		this._limiter3.attack.value = 0;
		this._limiter3.release.value = 0.01;

		this._limiter4.threshold.value = -3;
		this._limiter4.ratio.value = 1000000000000000000000000000000000000;
		this._limiter4.attack.value = 0;
		this._limiter4.release.value = 0.01;

		this._gain.connect(this._limiter1);
		this._gain.connect(this._delay.delayTime);
		this._limiter1.connect(this._limiter2);
		this._limiter2.connect(this._limiter3);
		this._limiter3.connect(this._limiter4);
		this._limiter4.connect(audioContext.destination);
	}

	disconnect = () => {
		setTimeout(() => {
			this._gain.disconnect(this._limiter1);
			this._gain.disconnect(this._delay.delayTime);
			this._limiter1.disconnect(this._limiter2);
			this._limiter2.disconnect(this._limiter3);
			this._limiter3.disconnect(this._limiter4);
			this._limiter4.disconnect(audioContext.destination);
			this._gain = null as any;
			this._delay = null as any;
			this._limiter1 = null as any;
			this._limiter2 = null as any;
			this._limiter3 = null as any;
			this._limiter4 = null as any;
		}, 200);
	};

	speaker = (): IGainNode<IAudioContext> => this._gain;
	resampling = (): IAudioNode<IAudioContext> => this._delay;

	get gain(): IAudioParam {
		return this._gain.gain;
	}
}
