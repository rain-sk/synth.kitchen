import { connect } from 'extendable-media-recorder-wav-encoder';
import { register } from 'extendable-media-recorder';
import { AudioContext } from 'standardized-audio-context';

import { initAudioProcessors } from './processors';

export const audioContext = {
	current: new AudioContext(),
	get currentTime() {
		return audioContext.current.currentTime;
	},
};

export const resampling = { current: audioContext.current.createDelay() };

export const resetAudioContext = async () => {
	const oldContext = audioContext.current;
	audioContext.current = new AudioContext();
	await oldContext.close();
	audioContext.current.resume();
	resampling.current = audioContext.current.createDelay();
	resampling.current.delayTime.value = 256 / audioContext.current.sampleRate;
	await initAudioProcessors(audioContext.current)();
};

export const initAudio = async () => {
	await register(await connect());
	await resetAudioContext();
};
