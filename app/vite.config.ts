import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), analyzer()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'react-use': ['react-use'],
					'server-name-gen': ['server-name-gen'],
					'extendable-media-recorder': ['extendable-media-recorder'],
					'extendable-media-recorder-wav-encoder': [
						'extendable-media-recorder-wav-encoder',
					],
					webmidi: ['webmidi'],
					'standardized-audio-context': ['standardized-audio-context'],
				},
			},
		},
	},
	server: {
		watch: {
			usePolling: true,
		},
		strictPort: true,
		port: 8080,
	},
});
