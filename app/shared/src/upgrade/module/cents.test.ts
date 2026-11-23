import { describe, expect, it } from 'vitest';

import { splitCents } from './cents';

const table: Array<[number, number, number]> = [
	[0, 0, 0],
	[1, 0, 1],
	[50, 0, 50],
	[99, 0, 99],
	[100, 0, 100],
	[101, 1, 1],
	[150, 1, 50],
	[199, 1, 99],
	[200, 2, 0],
	[250, 2, 50],
	[1000, 10, 0],
	[-1, 0, -1],
	[-50, 0, -50],
	[-99, 0, -99],
	[-100, 0, -100],
	[-101, -1, -1],
	[-150, -1, -50],
	[-250, -2, -50],
	[-1000, -10, 0],
];

describe('splitCents', () => {
	it('matches the decided table exactly', () => {
		for (const [cents, transpose, detune] of table) {
			expect(splitCents(cents), `${cents} cents`).toEqual({
				transpose,
				detune,
			});
		}
	});

	it('round trips cents through the two parts', () => {
		for (const [cents] of table) {
			const { transpose, detune } = splitCents(cents);
			expect(
				transpose * 100 + detune,
				`round trip for ${cents}`,
			).toBe(cents);
		}
	});

	it('never splits anything inside a semitone', () => {
		for (let cents = -100; cents <= 100; cents++) {
			expect(splitCents(cents).transpose, `${cents} cents`).toBe(0);
		}
	});

	it('returns detune untouched at the boundary, so -100 is not -0', () => {
		expect(Object.is(splitCents(-100).detune, -100)).toBe(true);
	});

	it('never emits negative zero', () => {
		for (let cents = -1000; cents <= 1000; cents += 50) {
			const { transpose, detune } = splitCents(cents);

			expect(Object.is(detune, -0), `detune at ${cents}`).toBe(false);
			expect(Object.is(transpose, -0), `transpose at ${cents}`).toBe(false);
		}

		expect(JSON.stringify(splitCents(-200))).toBe(
			'{"transpose":-2,"detune":0}',
		);
	});
});
