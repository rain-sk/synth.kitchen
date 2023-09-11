import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '../context';

export class NoiseNode {
	private _node = new (AudioWorkletNode as any)(audioContext, 'noise');

	node = (): IAudioWorkletNode<IAudioContext> => this._node;
}
