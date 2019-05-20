import { noteToFrequency, transpose } from 'music-fns';

const base = 'C1';

const cache = new Map<number, { freq: number, name: string }>();
export function chromatic(note: number): { freq: number, name: string } {
	const cachedResult = cache.get(note);
	if (cachedResult === undefined) {
		const row = parseInt(note.toString()[0]) - 1;
		const col = (note % 10) - 1;
		const name = transpose(base, 5 * row + col);
		const freq = noteToFrequency(name);
		const result = {
			name,
			freq
		};
		cache.set(note, result);
		return result;
	} else {
		return cachedResult;
	}
}
