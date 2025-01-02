import React from 'react';
import ReactDOM from 'react-dom/client';

import { audio, initAudio } from './patch/audio';
import { initMidi } from './patch/midi';

import { SynthKitchen } from './app';

import './reset.css';
import './styles.css';

initAudio()
	.then(() => initMidi())
	.then(() => {
		if (audio.initialized) {
			ReactDOM.createRoot(
				document.getElementById('root') as HTMLElement,
			).render(
				<React.StrictMode>
					<SynthKitchen />
				</React.StrictMode>,
			);
		} else {
			alert(
				"You're using an unsupported browser. Please try again with Firefox, etc.",
			);
		}
	});
