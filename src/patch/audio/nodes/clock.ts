import {
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode,
} from 'standardized-audio-context';
import { audioContext } from '../';
import { audioWorkletNodeFactory } from './audio-worklet-node-factory';

export class ClockNode {
	private _node = audioWorkletNodeFactory('clock');

	disconnect = () => {
		setTimeout(() => {
			this._node.parameters
				.get('active')
				?.setValueAtTime(0, audioContext.currentTime);
		}, 10);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get tempo(): IAudioParam {
		return this._node.parameters.get('tempo') as IAudioParam;
	}
}
