import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '..';

declare const audioWorkletNode: IAudioWorkletNode<IAudioContext>;

export class NoiseNode {
	private _node = new (AudioWorkletNode as any)(
		audioContext,
		'noise-processor'
	);

	node = (): IAudioWorkletNode<IAudioContext> => this._node;
}
