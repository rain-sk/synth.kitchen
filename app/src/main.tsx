import React from 'react';
import ReactDOM from 'react-dom/client';

import { SynthKitchen } from './app';

import './reset.css';
import './styles.css';
import { client } from './api/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<SynthKitchen />
	</React.StrictMode>,
);

console.log(client);
