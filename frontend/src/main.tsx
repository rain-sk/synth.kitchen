import React from 'react';
import ReactDOM from 'react-dom/client';
import SuperTokens, { SuperTokensWrapper } from 'supertokens-auth-react';

import { SuperTokensConfig } from './auth';
import { SynthKitchen } from './app';

import './reset.css';
import './styles.css';

SuperTokens.init(SuperTokensConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<SuperTokensWrapper>
			<SynthKitchen />
		</SuperTokensWrapper>
	</React.StrictMode>,
);
