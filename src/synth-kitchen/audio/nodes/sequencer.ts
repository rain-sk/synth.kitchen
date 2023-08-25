import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode
} from 'standardized-audio-context';
import { audioContext } from '..';

export class SequencerNode {
	private _node = new (AudioWorkletNode as any)(audioContext, 'sequencer');

	node = (): IAudioWorkletNode<IAudioContext> => this._node;
}
