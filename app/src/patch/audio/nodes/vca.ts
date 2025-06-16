import {
	IAudioContext,
	IAudioParam,
	IGainNode,
} from 'standardized-audio-context';

import { audioContext } from '../';
import { AdsrNode } from './adsr';
import { GateNode } from './gate';

export class VcaNode {
	private _adsr = new AdsrNode();
	private _adsrPeak = audioContext.createGain();
	private _signalGain = audioContext.createGain();
	private _gate = new GateNode();

	constructor() {
		this._signalGain.gain.setValueAtTime(0, audioContext.currentTime);
		this._adsr.node().connect(this._adsrPeak);
		this._adsrPeak.connect(this._signalGain.gain);
		this._gate.node().connect(this._adsr.node());
	}

	disconnect = () => {
		setTimeout(() => {
			this._gate.node().disconnect(this._adsr.node());
			this._adsr.node().disconnect(this._adsrPeak);
			this._adsrPeak.disconnect(this._signalGain.gain);
			this._adsr.disconnect();
		}, 10);
	};

	adsr = (): AdsrNode => this._adsr;
	gain = (): IGainNode<IAudioContext> => this._signalGain;
	sync = (): GateNode => this._gate;

	get gate(): IAudioParam {
		return this._gate.gate;
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
