import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
} from 'standardized-audio-context';
import { audioContext } from '../context';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class GateNode {
	private _node = audioWorkletNodeFactory('gate');

	disconnect = () => {
		setTimeout(() => {
			this._node.parameters
				.get('active')
				?.setValueAtTime(0, audioContext.currentTime);
		}, 10);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get gate(): IAudioParam {
		return this._node.parameters.get('gate') as IAudioParam;
	}
}
