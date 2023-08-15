import React from 'react';
import ReactDOM from 'react-dom/client';

import { audio, initAudio } from './synth-kitchen/audio';
import { Kitchen } from './synth-kitchen/kitchen';
// import { initMidi, midi } from './synth-kitchen/midi';
import {
	audioProcessors,
	initAudioProcessors
} from './synth-kitchen/processors';

import './reset.css';
import './styles.css';

Promise.all([
	initAudio(),
	// initMidi(),
	initAudioProcessors()
]).then(() => {
	if (
		audio.initialized &&
		// midi.initialized &&
		audioProcessors.initialized
	) {
		ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
			<React.StrictMode>
				<Kitchen />
			</React.StrictMode>
		);
	} else {
		alert(
			"You're using an unsupported browser. Please try again with Firefox, etc."
		);
	}
});
