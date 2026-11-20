import { describe, expect, it } from 'vitest';

import { VCA_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './vca';

const CURRENT = VCA_STATE_VERSIONS[0]; // "0.5.7"

const params = () => ({
	attack: 0.01,
	decay: 0.2,
	sustain: 0.6,
	release: 0.3,
	peak: 0.8,
});

describe('vca upgrade', () => {
	it('carries a legacy gate value into hold at the current version', () => {
		const out = upgrade({ ...params(), gate: 2.25 } as any) as any;

		expect(out.version).toBe(CURRENT);
		expect(out.hold).toBe(2.25);
		expect('gate' in out).toBe(false);
	});

	it('lands on hold from every version in the ladder', () => {
		const cases: Array<[string, any, number]> = [
			['0.5.0', { gate: 1 }, 1],
			['0.5.4', { hold: 2 }, 2],
			['0.5.5', { gate: 3 }, 3],
			[CURRENT, { hold: 4 }, 4],
		];

		for (const [version, shape, expected] of cases) {
			const out = upgrade({ version, ...params(), ...shape } as any) as any;

			expect(out.hold, `hold at the current version, from ${version}`).toBe(expected);
			expect('gate' in out, `gate at the current version, from ${version}`).toBe(false);
		}
	});

	it('preserves the level parameters untouched', () => {
		const out = upgrade({ ...params(), gate: 1 } as any) as any;

		expect(out).toMatchObject({
			attack: 0.01,
			decay: 0.2,
			sustain: 0.6,
			release: 0.3,
			peak: 0.8,
		});
	});

	it('refuses a partial legacy shape and an unknown version', () => {
		const { sustain, ...partial } = params();

		expect(() => upgrade({ ...partial, gate: 1 } as any)).toThrow(
			/Unable to upgrade/,
		);
		expect(() => upgrade({ version: '0.5.9', gate: 1 } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		const legacy = { ...params(), gate: 1 } as any;

		expect(needsUpgrade(legacy)).toBe(true);
		expect(needsUpgrade(upgrade(legacy) as any)).toBe(false);
	});
});
