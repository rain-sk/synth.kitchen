import { audioContext } from '../audio';

export const audioProcessors = {
	initialized: false
};

export const processors = {
	'noise-processor': 'noise-processor.js'
};

export const initAudioProcessors = async () => {
	return Promise.all(
		Object.values(processors).map((processor) =>
			audioContext.audioWorklet?.addModule(processor)
		)
	).then(() => {
		audioProcessors.initialized = true;
	});
};
