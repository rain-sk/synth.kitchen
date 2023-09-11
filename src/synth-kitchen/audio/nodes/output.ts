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

	constructor() {
		this._delay.delayTime.setValueAtTime(
			256 / audioContext.sampleRate,
			audioContext.currentTime
		);
		this._gain.connect(this._delay.delayTime);
		this._gain.connect(audioContext.destination);
	}

	disconnect = () => {
		setTimeout(() => {
			this._gain.disconnect(this._delay);
			this._gain.disconnect(audioContext.destination);
			this._gain = null as any;
			this._delay = null as any;
		}, 200);
	};

	speaker = (): IGainNode<IAudioContext> => this._gain;
	resampling = (): IAudioNode<IAudioContext> => this._delay;

	get gain(): IAudioParam {
		return this._gain.gain;
	}
}
