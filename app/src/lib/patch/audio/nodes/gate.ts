import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
} from 'standardized-audio-context';

import { audioContext } from '..';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class GateNode {
	private _node = audioWorkletNodeFactory('gate');

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get gate(): IAudioParam {
		return this._node.parameters.get('gate') as IAudioParam;
	}
}
