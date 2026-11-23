const siteKeys: Record<string, string> = {
	'synth.kitchen': 'd5e84eeeb2',
	'www.synth.kitchen': 'd5e84eeeb2',
	'staging.synth.kitchen': 'cd047f0fb2',
};

export const capEndpoint = (() => {
	const siteKey = siteKeys[window.location.hostname];
	return siteKey ? `https://cap.synth.kitchen/${siteKey}/` : undefined;
})();
