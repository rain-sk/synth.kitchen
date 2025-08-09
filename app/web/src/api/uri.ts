export const apiBase = (() => {
	switch (window.location.host) {
		case 'synth.kitchen':
			return 'https://synth.kitchen/api';
		case 'staging.synth.kitchen':
			return 'https://staging.synth.kitchen/api';
		case 'localhost:8080':
		default:
			return 'http://localhost:3000';
	}
})();
