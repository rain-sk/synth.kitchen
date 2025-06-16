import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';

import { audioWorkletNodeFactory } from './audio-worklet-node-factory';
import { audioContext } from '..';

export class LimiterNode {
	private _node = audioWorkletNodeFactory('limiter');

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	input = (): IAudioWorkletNode<IAudioContext> => this._node;
	output = (): IAudioWorkletNode<IAudioContext> => this._node;
}
