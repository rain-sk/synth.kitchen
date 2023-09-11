import { AudioWorkletNode, IAudioContext } from 'standardized-audio-context';
import adsr from './adsr.js?url';
import clock from './clock.js?url';
import gate from './gate.js?url';
import limiter from './limiter.js?url';
import noise from './noise.js?url';
import sequencer from './sequencer.js?url';

export const processors = [adsr, clock, gate, limiter, noise, sequencer];

export const initAudioProcessors = (context: IAudioContext) => async () => {
	if (!AudioWorkletNode) {
		throw 'No AudioWorkletNode, uh ohhhh';
	}
	return Promise.all(
		processors.map((processor) => context.audioWorklet?.addModule(processor))
	);
};
