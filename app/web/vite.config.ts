import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';
import { defineConfig } from 'vite';

const plugins =
	process.env.NODE_ENV === 'production' ? [react()] : [react(), analyzer()];

const apiOrigin = process.env.VITE_API_ORIGIN ?? 'http://localhost:3000';

const port = Number(process.env.VITE_PORT ?? 8080);

const proxy = {
	'/api': {
		target: apiOrigin,
		rewrite: (path: string) => path.replace(/^\/api/, ''),
	},
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins,
	build: {
		outDir: 'build',
		rollupOptions: {
			output: {
				manualChunks: {
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
		port,
		proxy,
	},
	preview: {
		host: true,
		strictPort: true,
		port,
		proxy,
	},
});
