import React from 'react';
import ReactDOM from 'react-dom/client';

import { audio, initAudio } from './synth-kitchen/audio';
import { Kitchen } from './synth-kitchen/components/kitchen';
import { initMidi, midi } from './synth-kitchen/midi';

import './reset.css';
import './styles.css';

Promise.all([initAudio(), initMidi()]).then(() => {
	if (audio.initialized && midi.initialized) {
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
