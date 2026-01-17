import {
	IAudioContext,
	IAudioNode,
	IAudioParam,
} from 'standardized-audio-context';

import { audioContext } from '..';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class NoiseNode {
	private _node = audioWorkletNodeFactory('noise');
	private _gain = audioContext.current.createGain();

	constructor() {
		this._node.connect(this._gain);
	}

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	output = (): IAudioNode<IAudioContext> => this._gain;

	get level(): IAudioParam {
		return this._gain.gain;
	}
}
