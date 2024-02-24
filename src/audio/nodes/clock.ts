import {
	AudioWorkletNode,
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class ClockNode {
	private _node = new (AudioWorkletNode as any)(
		audioContext,
		'clock'
	) as IAudioWorkletNode<IAudioContext>;

	disconnect = () => {
		setTimeout(() => {
			this._node.parameters
				.get('active')
				?.setValueAtTime(0, audioContext.currentTime);
			this._node = null as any;
		}, 10);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get tempo(): IAudioParam {
		return this._node.parameters.get('tempo') as IAudioParam;
	}
}
