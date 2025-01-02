import {
	AudioWorkletNode,
	IAudioContext,
	IAudioWorkletNode,
} from 'standardized-audio-context';
import { audioContext } from '../context';

export const audioWorkletNodeFactory = (
	id: string,
): IAudioWorkletNode<IAudioContext> => {
	if (!AudioWorkletNode) {
		throw Error('no AudioWorkletNode constructor');
	}
	return new AudioWorkletNode(audioContext, id);
};
