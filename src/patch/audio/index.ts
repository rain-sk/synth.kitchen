import { AudioContext } from 'standardized-audio-context';
import { connect } from 'extendable-media-recorder-wav-encoder';

import { initAudioProcessors } from './processors';
import { register } from 'extendable-media-recorder';

export const audioContext = new AudioContext();

export const resampling = audioContext.createDelay();
resampling.delayTime.value = 256 / audioContext.sampleRate;

export const audio = {
	initialized: false,
};

export const initAudio = async () => {
	await register(await connect());
	await audioContext.resume();
	await initAudioProcessors(audioContext)();
	audio.initialized = true;
};
