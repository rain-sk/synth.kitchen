export type CrashKind = 'app' | 'canvas';

export const crashHooksEnabled =
	import.meta.env.DEV || import.meta.env.VITE_CRASH_HOOKS === '1';

export const crashKind = (): CrashKind | null => {
	const value = new URLSearchParams(window.location.search).get('crash');
	return value === 'app' || value === 'canvas' ? value : null;
};
