import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
} from 'standardized-audio-context';

import { audioWorkletNodeFactory } from './audio-worklet-node-factory';
import { audioContext } from '..';

export class ShiftNode {
	private _node = audioWorkletNodeFactory('shift');

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	input = (): IAudioWorkletNode<IAudioContext> => this._node;
	output = (): IAudioWorkletNode<IAudioContext> => this._node;

	get inputMin(): IAudioParam {
		return this._node.parameters.get('inputMin') as IAudioParam;
	}

	get inputMax(): IAudioParam {
		return this._node.parameters.get('inputMax') as IAudioParam;
	}

	get outputMin(): IAudioParam {
		return this._node.parameters.get('outputMin') as IAudioParam;
	}

	get outputMax(): IAudioParam {
		return this._node.parameters.get('outputMax') as IAudioParam;
	}
}
