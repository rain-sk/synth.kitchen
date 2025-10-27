import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';
import { defineConfig } from 'vite';

const plugins =
	process.env.NODE_ENV === 'production' ? [react()] : [react(), analyzer()];

// https://vitejs.dev/config/
export default defineConfig({
	plugins,
	build: {
		outDir: 'build',
		rollupOptions: {
			output: {
				manualChunks: {
					'cash-dom': ['cash-dom'],
					'react-use': ['react-use'],
					shared: ['synth.kitchen-shared'],
					'modern-screenshot': ['modern-screenshot'],
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
