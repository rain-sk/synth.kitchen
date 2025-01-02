import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class LimiterNode {
	private _node = audioWorkletNodeFactory('limiter');

	disconnect = () => {
		setTimeout(() => {
			this._node.disconnect();
		}, 10);
	};

	input = (): IAudioWorkletNode<IAudioContext> => this._node;
	output = (): IAudioWorkletNode<IAudioContext> => this._node;
}
