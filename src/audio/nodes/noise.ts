import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { audioContext } from '../context';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class NoiseNode {
	private _node = audioWorkletNodeFactory('noise');

	disconnect = () => {
		setTimeout(() => {
			this._node.parameters
				.get('active')
				?.setValueAtTime(0, audioContext.currentTime);
			this._node = null as any;
		}, 10);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;
}
