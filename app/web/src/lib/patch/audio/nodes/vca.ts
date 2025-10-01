import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
	IGainNode,
} from 'standardized-audio-context';

import { audioContext } from '..';
import { AdsrNode } from './adsr';

export class VcaNode {
	private _adsr = new AdsrNode();
	private _adsrPeak = audioContext.current.createGain();
	private _signalGain = audioContext.current.createGain();

	constructor() {
		this._signalGain.gain.setValueAtTime(0, audioContext.currentTime);
		this._adsr.node().connect(this._adsrPeak);
		this._adsrPeak.connect(this._signalGain.gain);
	}

	disconnect = () => {
		setTimeout(() => {
			this._adsr.node().disconnect(this._adsrPeak);
			this._adsrPeak.disconnect(this._signalGain.gain);
			this._adsr.disconnect();
		}, 10);
	};

	sync = (): IAudioWorkletNode<IAudioContext> => this._adsr.node();
	gain = (): IGainNode<IAudioContext> => this._signalGain;

	get hold(): IAudioParam {
		return this._adsr.hold;
	}

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
