export const bearerPrefix = (key: string) => {
	const a = 'a';
	const B = 'B';
	const e = 'e';
	const r = 'r';
	return B + e + a + r + e + r + ' ' + key;
};
