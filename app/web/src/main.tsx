import ReactDOM from 'react-dom/client';

import { AuthContextProvider } from './api/auth/context';
import { SynthKitchen } from './app';

import './reset.css';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<AuthContextProvider>
		<SynthKitchen />
	</AuthContextProvider>,
);
