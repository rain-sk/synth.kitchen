import { AudioWorkletNode, IAudioContext } from 'standardized-audio-context';
import noiseProcessor from './noise-processor.js?url';

export const processors = [noiseProcessor];

export const initAudioProcessors = (context: IAudioContext) => async () => {
	if (!AudioWorkletNode) {
		throw 'No AudioWorkletNode, uh ohhhh';
	}
	return Promise.all(
		processors.map((processor) => context.audioWorklet?.addModule(processor))
	);
};
