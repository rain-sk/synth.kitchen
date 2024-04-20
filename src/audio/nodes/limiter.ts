import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class LimiterNode {
	private _node = new (AudioWorkletNode as any)(audioContext, 'limiter');

	disconnect = () => {
		setTimeout(() => {
			this._node.disconnect();

			this._node = null as any;
		}, 10);
	};

	input = (): IAudioWorkletNode<IAudioContext> => this._node;
	output = (): IAudioWorkletNode<IAudioContext> => this._node;
}
