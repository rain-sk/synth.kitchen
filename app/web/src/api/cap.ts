// Cap, the self-hosted captcha (https://cap.synth.kitchen). A site key is public: it governs who
// may request challenges, never verification — the secret lives only in the api's env. Hosts with no
// entry (localhost, e2e) get no widget, matching the api-side captcha being off there.
const siteKeys: Record<string, string> = {
	'synth.kitchen': 'd5e84eeeb2',
	'www.synth.kitchen': 'd5e84eeeb2',
	'staging.synth.kitchen': 'cd047f0fb2',
};

export const capEndpoint = (() => {
	const siteKey = siteKeys[window.location.hostname];
	return siteKey ? `https://cap.synth.kitchen/${siteKey}/` : undefined;
})();
