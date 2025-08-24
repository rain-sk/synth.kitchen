export function stringToInt(str: string): number {
	const FNV_PRIME = 0x01000193;
	const OFFSET_BASIS = 0x811c9dc5;

	let hash = OFFSET_BASIS;

	for (let i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash = Math.imul(hash, FNV_PRIME);
	}

	return (hash >>> 0) | 0;
}
