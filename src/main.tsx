import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebMidi } from 'webmidi';

import { Kitchen } from './synth-kitchen/kitchen';

import './reset.css';
import './styles.css';

WebMidi.enable()
	.catch((err: string) => alert(err))
	.finally(() => {
		ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
			<React.StrictMode>
				<Kitchen />
			</React.StrictMode>
		);
	});
