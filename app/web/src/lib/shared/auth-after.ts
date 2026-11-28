const authParam = 'auth';
const afterParam = 'after';

const actions = ['save'] as const;

export type AfterAuth = (typeof actions)[number];

const isAction = (value: string | null): value is AfterAuth =>
	actions.includes(value as AfterAuth);

export const readAfterAuth = (search: string): AfterAuth | null => {
	const value = new URLSearchParams(search).get(afterParam);
	return isAction(value) ? value : null;
};

export const askAuth = (
	pathname: string,
	search: string,
	mode: 'login',
	action?: AfterAuth,
) => {
	const params = new URLSearchParams(search);
	params.set(authParam, mode);
	if (action) params.set(afterParam, action);
	else params.delete(afterParam);
	return `${pathname}?${params.toString()}`;
};

export const keepAfterAuth = (pathname: string) => {
	const params = new URLSearchParams(window.location.search);
	params.delete(authParam);
	if (!params.has(afterParam)) return null;
	return `${pathname}?${params.toString()}`;
};

export const clearAuthParams = (pathname: string) => {
	const params = new URLSearchParams(window.location.search);
	if (!params.has(authParam) && !params.has(afterParam)) return null;
	params.delete(authParam);
	params.delete(afterParam);
	return `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
};
