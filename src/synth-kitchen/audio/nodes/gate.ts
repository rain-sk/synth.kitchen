import {
	AudioWorkletNode,
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class GateNode {
	private _node = new (AudioWorkletNode as any)(
		audioContext,
		'gate'
	) as IAudioWorkletNode<IAudioContext>;

	disconnect = () => {
		setTimeout(() => {
			this._node.parameters
				.get('active')
				?.setValueAtTime(0, audioContext.currentTime);
			this._node = null as any;
		}, 200);
	};

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get gate(): IAudioParam {
		return this._node.parameters.get('gate') as IAudioParam;
	}
}
