import { connect } from 'extendable-media-recorder-wav-encoder';
import { register } from 'extendable-media-recorder';
import { AudioContext } from 'standardized-audio-context';

import { initAudioProcessors } from './processors';

export const audioContext = new AudioContext();

export const resampling = audioContext.createDelay();
resampling.delayTime.value = 256 / audioContext.sampleRate;

export const initAudio = async () => {
	await register(await connect());
	await audioContext.resume();
	await initAudioProcessors(audioContext)();
};
