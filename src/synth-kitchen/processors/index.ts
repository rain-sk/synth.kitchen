import { audioContext } from '../audio';

import noiseProcessor from './noise-processor.js?url';

export const audioProcessors = {
	initialized: false
};

export const processors = {
	'noise-processor': noiseProcessor
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
