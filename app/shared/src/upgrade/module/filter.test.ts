import { describe, expect, it } from 'vitest';

import { FILTER_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './filter';

const CURRENT = FILTER_STATE_VERSIONS[0]; // "0.5.12"

const legacy = (detune: number) => ({
	frequency: 1200,
	detune,
	Q: 0.7,
	gain: 2,
	type: 'lowpass' as const,
});

const at = (detune: number) => upgrade(legacy(detune) as any) as any;

describe('filter upgrade: detune / transpose split', () => {
	it('splits cents into semitones using modulo, keeping the sign', () => {
		expect(at(150)).toMatchObject({ transpose: 1, detune: 50 });
		expect(at(-150)).toMatchObject({ transpose: -1, detune: -50 });
		expect(at(50)).toMatchObject({ transpose: 0, detune: 50 });
		expect(at(0)).toMatchObject({ transpose: 0, detune: 0 });
	});

	it('rolls exactly 100 cents up to one semitone, unlike oscillator', () => {
		expect(at(100)).toMatchObject({ transpose: 1, detune: 0 });

		const down = at(-100);
		expect(down.transpose).toBe(-1);
		expect(Object.is(down.detune, -0)).toBe(true);
		expect(JSON.stringify(down)).not.toContain('-0');
	});

	it('round trips cents through transpose and detune', () => {
		for (const input of [-1234, -250, -100, -50, 0, 50, 100, 250, 1234]) {
			const out = at(input);
			expect(
				out.transpose * 100 + out.detune,
				`round trip for ${input} cents`,
			).toBe(input);
		}
	});

	it('preserves the filter parameters', () => {
		const out = at(150);

		expect(out).toMatchObject({
			frequency: 1200,
			Q: 0.7,
			gain: 2,
			type: 'lowpass',
			version: CURRENT,
		});
	});

	it('produces exactly the fields the current state declares', () => {
		const declared = ['version', 'frequency', 'transpose', 'detune', 'Q', 'gain', 'type'];

		expect(Object.keys(at(150)).sort()).toEqual(declared.sort());
	});

	it('does not re-divide a transpose it just computed', () => {
		const out = at(20000);

		expect(out.transpose).toBe(200);
		expect(out.detune).toBe(0);
	});

	it('divides an oversized transpose when arriving at 0.5.11', () => {
		const out = upgrade(
			{ version: '0.5.11', ...legacy(0), transpose: 200 } as any,
		) as any;

		expect(out.transpose).toBe(2);
		expect(out.version).toBe(CURRENT);
	});

	it('leaves a modest transpose at 0.5.11 untouched', () => {
		const out = upgrade(
			{ version: '0.5.11', ...legacy(0), transpose: 3 } as any,
		) as any;

		expect(out.transpose).toBe(3);
	});

	it('refuses a partial legacy shape and an unknown version', () => {
		const { Q, ...noQ } = legacy(0);

		expect(() => upgrade(noQ as any)).toThrow(/Unable to upgrade/);
		expect(() => upgrade({ version: '0.5.3' } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		expect(needsUpgrade(legacy(150) as any)).toBe(true);
		expect(needsUpgrade(at(150) as any)).toBe(false);
	});
});
