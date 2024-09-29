import React from 'react';
import ReactDOM from 'react-dom/client';

import { audio, initAudio } from './audio';
import { initMidi } from './midi';

import { Kitchen } from './components/kitchen';

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
					<Kitchen />
				</React.StrictMode>,
			);
		} else {
			alert(
				"You're using an unsupported browser. Please try again with Firefox, etc.",
			);
		}
	});
