export const apiBase = (() => {
	switch (window.location.hostname) {
		case 'synth.kitchen':
			return 'https://synth.kitchen/api';
		case 'staging.synth.kitchen':
			return 'https://staging.synth.kitchen/api';
		default:
			return '/api';
	}
})();
