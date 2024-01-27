import { AudioContext } from 'standardized-audio-context';

export const audioContext = new AudioContext();

export const resampling = audioContext.createDelay();
resampling.delayTime.value = 256 / audioContext.sampleRate;
