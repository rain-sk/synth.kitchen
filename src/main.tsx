import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebMidi } from 'webmidi';

import { Kitchen } from './synth-kitchen/kitchen';

import './index.css';

WebMidi.enable()
	.catch((err: string) => alert(err))
	.finally(() => {
		ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
			<React.StrictMode>
				<Kitchen />
			</React.StrictMode>
		);
	});
