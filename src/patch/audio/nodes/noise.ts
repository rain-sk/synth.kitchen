import { IAudioContext, IAudioWorkletNode } from 'standardized-audio-context';
import { audioContext } from '../context';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class NoiseNode {
	private _node = audioWorkletNodeFactory('noise');

	disconnect = () => {
		this._node.parameters
			.get('active')
			?.setValueAtTime(0, audioContext.currentTime);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;
}
