import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
} from 'standardized-audio-context';

import { audioContext } from '..';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class AdsrNode {
	private _node = audioWorkletNodeFactory('adsr');

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get attack(): IAudioParam {
		return this._node.parameters.get('attack') as IAudioParam;
	}

	get decay(): IAudioParam {
		return this._node.parameters.get('decay') as IAudioParam;
	}

	get sustain(): IAudioParam {
		return this._node.parameters.get('sustain') as IAudioParam;
	}

	get release(): IAudioParam {
		return this._node.parameters.get('release') as IAudioParam;
	}
}
