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
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{
							test: /node_modules/,
							name: 'libs',
						},

					]
				},
			}
		}
	},
	server: {
		watch: {
			usePolling: true,
		},
		strictPort: true,
		port: 8080,
	},
});
