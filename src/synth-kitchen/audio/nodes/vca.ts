import {
	IAudioContext,
	IAudioParam,
	IGainNode
} from 'standardized-audio-context';
import { audioContext } from '../context';
import { AdsrNode } from './adsr';

export class VcaNode {
	private _adsr = new AdsrNode();
	private _adsrPeak = audioContext.createGain();
	private _signalGain = audioContext.createGain();

	constructor() {
		this._signalGain.gain.setValueAtTime(0, audioContext.currentTime);
		this._adsr.node().connect(this._adsrPeak);
		this._adsrPeak.connect(this._signalGain.gain);
	}

	disconnect = () => {
		setTimeout(() => {
			this._adsr.node().disconnect(this._adsrPeak);
			this._adsrPeak.disconnect(this._signalGain.gain);
			this._adsr = null as any;
			this._adsrPeak = null as any;
			this._signalGain = null as any;
		}, 200);
	};

	adsr = (): AdsrNode => this._adsr;
	gain = (): IGainNode<IAudioContext> => this._signalGain;

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
		return this._adsrPeak.gain;
	}
}
