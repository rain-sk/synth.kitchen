import { describe, expect, it } from 'vitest';

import { ENVELOPE_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './envelope';

const CURRENT = ENVELOPE_STATE_VERSIONS[0];

const legacy = () => ({
	attack: 0.1,
	decay: 0.2,
	sustain: 0.3,
	release: 0.4,
	peak: 0.9,
	gate: 1.5,
});

describe('envelope upgrade', () => {
	it('carries the legacy gate value into hold and drops gate', () => {
		const out = upgrade(legacy() as any) as any;

		expect(out.version).toBe(CURRENT);
		expect(out.hold).toBe(1.5);
		expect('gate' in out).toBe(false);
	});

	it('preserves the untouched parameters through the ping-pong', () => {
		const out = upgrade(legacy() as any) as any;

		expect(out.attack).toBe(0.1);
		expect(out.decay).toBe(0.2);
		expect(out.sustain).toBe(0.3);
		expect(out.release).toBe(0.4);
		expect(out.peak).toBe(0.9);
	});

	it('lands on hold from every version in the ladder', () => {
		const params = {
			attack: 0.1,
			decay: 0.2,
			sustain: 0.3,
			release: 0.4,
			peak: 0.9,
		};
		const cases: Array<[string, any, number]> = [
			['0.5.0', { gate: 1.5 }, 1.5],
			['0.5.4', { hold: 2.5 }, 2.5],
			['0.5.5', { gate: 3.5 }, 3.5],
			[CURRENT, { hold: 4.5 }, 4.5],
		];

		for (const [version, shape, expected] of cases) {
			const out = upgrade({ version, ...params, ...shape } as any) as any;

			expect(out.hold, `hold at the current version, coming from ${version}`).toBe(expected);
			expect('gate' in out, `gate at the current version, coming from ${version}`).toBe(false);
		}
	});

	it('refuses an unversioned state that is not recognisably an envelope', () => {
		const { peak, ...notAnEnvelope } = legacy();

		expect(() => upgrade(notAnEnvelope as any)).toThrow(/Unable to upgrade/);
	});

	it('refuses a version with no migration', () => {
		expect(() => upgrade({ version: '0.5.3', gate: 1 } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		const legacyState = legacy() as any;

		expect(needsUpgrade(legacyState)).toBe(true);
		expect(needsUpgrade(upgrade(legacyState) as any)).toBe(false);
	});
});
