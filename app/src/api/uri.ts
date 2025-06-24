export const apiBase = (() => {
	switch (window.location.host) {
		case 'synth.kitchen':
			return 'https://api.synth.kitchen';
		case 'staging.synth.kitchen':
			return 'https://staging-api.synth.kitchen';
		case 'localhost:8080':
		default:
			return 'http://localhost:3000';
	}
})();
