import {
	IAudioContext,
	IAudioParam,
	IGainNode
} from 'standardized-audio-context';
import { audioContext } from '../context';
import { AdsrNode } from './adsr';

export class VcaNode {
	private _adsr = new AdsrNode();
	private _gain = audioContext.createGain();

	constructor() {
		this.attack.setValueAtTime(0.05, audioContext.currentTime);
		this.decay.setValueAtTime(0.1, audioContext.currentTime);
		this.sustain.setValueAtTime(0.75, audioContext.currentTime);
		this.release.setValueAtTime(0.3, audioContext.currentTime);
		this._adsr.node().connect(this._gain);
	}

	disconnect = () => {
		this._adsr.node().disconnect(this._gain);
		this._adsr = null as any;
		this._gain = null as any;
	};

	adsr = (): AdsrNode => this._adsr;
	gain = (): IGainNode<IAudioContext> => this._gain;

	get attack(): IAudioParam {
		return this._adsr.attack;
	}

	get decay(): IAudioParam {
		return this._adsr.decay;
	}

	get sustain(): IAudioParam {
		return this._adsr.sustain;
	}

	get release(): IAudioParam {
		return this._adsr.release;
	}

	get peak(): IAudioParam {
		return this._gain.gain;
	}
}
