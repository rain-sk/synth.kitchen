import {
	AudioWorkletNode,
	IAudioContext,
	IAudioNode,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class LimiterNode {
	private _limiter1 = audioContext.createDynamicsCompressor();
	private _limiter2 = audioContext.createDynamicsCompressor();
	private _limiter3 = audioContext.createDynamicsCompressor();
	private _limiter4 = audioContext.createDynamicsCompressor();
	private _brickWall = new (AudioWorkletNode as any)(audioContext, 'limiter');

	constructor() {
		this._limiter1.connect(this._limiter2);
		this._limiter2.connect(this._limiter3);
		this._limiter3.connect(this._limiter4);
		this._limiter4.connect(this._brickWall);

		this._limiter1.threshold.value = -4;
		this._limiter1.ratio.value = 1000000000000000000000000000000000000;
		this._limiter1.attack.value = 0.001;
		this._limiter1.release.value = 0.01;

		this._limiter2.threshold.value = -3;
		this._limiter2.ratio.value = 1000000000000000000000000000000000000;
		this._limiter2.attack.value = 0;
		this._limiter2.release.value = 0.01;

		this._limiter3.threshold.value = -2;
		this._limiter3.ratio.value = 1000000000000000000000000000000000000;
		this._limiter3.attack.value = 0;
		this._limiter3.release.value = 0.01;

		this._limiter4.threshold.value = -1;
		this._limiter4.ratio.value = 1000000000000000000000000000000000000;
		this._limiter4.attack.value = 0;
		this._limiter4.release.value = 0.01;
	}

	disconnect = () => {
		setTimeout(() => {
			this._limiter1.disconnect(this._limiter2);
			this._limiter2.disconnect(this._limiter3);
			this._limiter3.disconnect(this._limiter4);
			this._limiter4.disconnect(this._brickWall);
			this._brickWall.disconnect();

			this._limiter1 = null as any;
			this._limiter2 = null as any;
			this._limiter3 = null as any;
			this._limiter4 = null as any;
			this._brickWall = null as any;
		}, 200);
	};

	input = (): IAudioNode<IAudioContext> => this._limiter1;
	output = (): IAudioWorkletNode<IAudioContext> => this._brickWall;
}
