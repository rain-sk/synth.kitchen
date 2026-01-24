import ReactDOM from 'react-dom/client';
import React from 'react';

import { SynthKitchen } from './app';
import { AuthContextProvider } from './api/auth/context-provider';

import './reset.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AuthContextProvider>
			<SynthKitchen />
		</AuthContextProvider>
	</React.StrictMode>,
);
