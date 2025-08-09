import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
} from 'standardized-audio-context';

import { audioContext } from '..';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class ClockNode {
	private _node = audioWorkletNodeFactory('clock');

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get tempo(): IAudioParam {
		return this._node.parameters.get('tempo') as IAudioParam;
	}
}
