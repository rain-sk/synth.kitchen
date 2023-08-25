import {
	AudioWorkletNode,
	IAudioContext,
	IAudioParam,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '..';

export class ClockNode {
	private _node = new (AudioWorkletNode as any)(
		audioContext,
		'clock'
	) as IAudioWorkletNode<IAudioContext>;

	node = (): IAudioWorkletNode<IAudioContext> => this._node;

	get tempo(): IAudioParam {
		return this._node.parameters.get('tempo') as IAudioParam;
	}
}
