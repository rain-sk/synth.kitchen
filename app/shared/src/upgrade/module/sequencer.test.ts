import { describe, expect, it } from 'vitest';

import { SEQUENCER_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './sequencer';

const CURRENT = SEQUENCER_STATE_VERSIONS[0];

const legacy8 = () => ({
	steps: 8,
	step0: 1,
	step1: 2,
	step2: 3,
	step3: 4,
	step4: 5,
	step5: 6,
	step6: 7,
	step7: 8,
});

const newSteps = (out: any) =>
	[8, 9, 10, 11, 12, 13, 14, 15].map((n) => out[`step${n}`]);

describe('sequencer upgrade', () => {
	it('pads an 8-step sequence to 16 steps at zero and adds slide', () => {
		const out = upgrade(legacy8() as any) as any;

		expect(out.version).toBe(CURRENT);
		expect(newSteps(out)).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
		expect(out.slide).toBe(0);
	});

	it('preserves the original eight step values', () => {
		const out = upgrade(legacy8() as any) as any;

		expect([0, 1, 2, 3, 4, 5, 6, 7].map((n) => out[`step${n}`])).toEqual([
			1, 2, 3, 4, 5, 6, 7, 8,
		]);
		expect(out.steps).toBe(8);
	});

	it('adds slide but invents no steps when upgrading from 0.5.1', () => {
		const out = upgrade(
			{ version: '0.5.1', steps: 16, step0: 5, step15: 9 } as any,
		) as any;

		expect(out.version).toBe(CURRENT);
		expect(out.slide).toBe(0);
		expect(out.step0).toBe(5);
		expect(out.step15).toBe(9);
		expect(out.step8).toBeUndefined();
	});

	it('refuses a partial legacy shape rather than guessing', () => {
		const { step7, ...partial } = legacy8();

		expect(() => upgrade(partial as any)).toThrow(/Unable to upgrade/);
	});

	it('refuses a version it has no migration for', () => {
		expect(() => upgrade({ version: '0.5.3', steps: 16 } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		const legacyState = legacy8() as any;

		expect(needsUpgrade(legacyState)).toBe(true);
		expect(needsUpgrade(upgrade(legacyState) as any)).toBe(false);
	});
});
