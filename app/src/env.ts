export const apiHost = import.meta.env.VITE_API_HOST || '';
if (!apiHost) {
	console.error('missing VITE_API_HOST configuration');
}
console.log(apiHost);
