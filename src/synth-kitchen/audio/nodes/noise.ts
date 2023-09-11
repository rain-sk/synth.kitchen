import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class NoiseNode {
	private _node = new (AudioWorkletNode as any)(audioContext, 'noise');

	disconnect = () => {
		setTimeout(() => {
			this._node.parameters
				.get('active')
				?.setValueAtTime(0, audioContext.currentTime);
			this._node = null as any;
		}, 200);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;
}
