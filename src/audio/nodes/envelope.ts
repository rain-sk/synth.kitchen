import {
	IAudioContext,
	IAudioParam,
	IGainNode
} from 'standardized-audio-context';
import { audioContext } from '../context';
import { AdsrNode } from './adsr';
import { GateNode } from './gate';

export class EnvelopeNode {
	private _adsr = new AdsrNode();
	private _gain = audioContext.createGain();
	private _gate = new GateNode();

	constructor() {
		this._gate.node().connect(this._adsr.node());
		this._adsr.node().connect(this._gain);
	}

	disconnect = () => {
		setTimeout(() => {
			this._gate.node().disconnect(this._adsr.node());
			this._adsr.node().disconnect(this._gain);
			this._adsr.disconnect();
			this._adsr = null as any;
			this._gain = null as any;
			this._gate = null as any;
		}, 10);
	};

	sync = (): GateNode => this._gate;
	gain = (): IGainNode<IAudioContext> => this._gain;

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
		return this._gain.gain;
	}
}
