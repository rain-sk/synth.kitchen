import { AudioWorkletNode } from 'standardized-audio-context';

import { audioContext } from '..';

import adsr from './adsr.js?url';
import clock from './clock.js?url';
import gate from './gate.js?url';
import limiter from './limiter.js?url';
import midiCc from './midi-cc.js?url';
import midiClock from './midi-clock.js?url';
import noise from './noise.js?url';
import sequencer from './sequencer.js?url';
import shift from './shift.js?url';

export const processors = [
	adsr,
	clock,
	gate,
	limiter,
	midiCc,
	midiClock,
	noise,
	sequencer,
	shift,
];

export const initAudioProcessors = async () => {
	if (!AudioWorkletNode) {
		throw 'No AudioWorkletNode, uh ohhhh';
	}
	await Promise.all(
		processors.map((processor) =>
			audioContext.current.audioWorklet?.addModule(processor),
		),
	);
};
