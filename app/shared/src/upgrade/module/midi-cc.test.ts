import { describe, expect, it } from 'vitest';

import { MIDI_CC_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './midi-cc';

const CURRENT = MIDI_CC_STATE_VERSIONS[0]; // "0.5.9"

const legacy = () => ({ input: 'velocity', cc: 7, min: 0, max: 127 });

describe('midi-cc upgrade', () => {
	it('adds the default channel to a legacy state', () => {
		const out = upgrade(legacy() as any) as any;

		expect(out.version).toBe(CURRENT);
		expect(out.channel).toBe(1);
	});

	it('preserves input, cc, min and max', () => {
		const out = upgrade(legacy() as any) as any;

		expect(out).toMatchObject({
			input: 'velocity',
			cc: 7,
			min: 0,
			max: 127,
		});
	});

	it('assigns channel 1 to a 0.5.0 state, which declares no channel of its own', () => {
		const out = upgrade({ version: '0.5.0', ...legacy() } as any) as any;

		expect(out.channel).toBe(1);
		expect(out.version).toBe(CURRENT);
	});

	it('does not touch a channel at the current version', () => {
		const out = upgrade({ version: CURRENT, ...legacy(), channel: 10 } as any) as any;

		expect(out.channel).toBe(10);
	});

	it('produces exactly the fields the current state declares', () => {
		const declared = ['version', 'input', 'cc', 'channel', 'min', 'max'];

		expect(Object.keys(upgrade(legacy() as any) as any).sort()).toEqual(
			declared.sort(),
		);
	});

	it('refuses a partial legacy shape and an unknown version', () => {
		const { cc, ...noCc } = legacy();

		expect(() => upgrade(noCc as any)).toThrow(/Unable to upgrade/);
		expect(() => upgrade({ version: '0.5.3' } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		expect(needsUpgrade(legacy() as any)).toBe(true);
		expect(needsUpgrade(upgrade(legacy() as any) as any)).toBe(false);
	});
});
