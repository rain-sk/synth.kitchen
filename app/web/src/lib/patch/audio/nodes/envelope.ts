import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
	IGainNode,
} from 'standardized-audio-context';

import { audioContext } from '..';
import { AdsrNode } from './adsr';

export class EnvelopeNode {
	private _adsr = new AdsrNode();
	private _gain = audioContext.createGain();

	constructor() {
		this._adsr.node().connect(this._gain);
	}

	disconnect = () => {
		setTimeout(() => {
			this._adsr.node().disconnect(this._gain);
			this._adsr.disconnect();
		}, 10);
	};

	sync = (): IAudioWorkletNode<IAudioContext> => this._adsr.node();
	gain = (): IGainNode<IAudioContext> => this._gain;

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
		return this._gain.gain;
	}
}
