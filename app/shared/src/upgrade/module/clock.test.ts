import { describe, expect, it } from 'vitest';

import { CLOCK_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './clock';

const CURRENT = CLOCK_STATE_VERSIONS[0]; // "0.5.0"

describe('clock upgrade', () => {
	it('stamps an unversioned tempo state as the current version', () => {
		const out = upgrade({ tempo: 120 } as any) as any;

		expect(out.version).toBe(CURRENT);
		expect(out.tempo).toBe(120);
	});

	it('passes the current version through untouched', () => {
		const out = upgrade({ version: CURRENT, tempo: 90 } as any) as any;

		expect(out.tempo).toBe(90);
		expect(out.version).toBe(CURRENT);
	});

	it('produces exactly the fields the current state declares', () => {
		const declared = ['version', 'tempo'];

		expect(Object.keys(upgrade({ tempo: 120 } as any) as any).sort()).toEqual(
			declared.sort(),
		);
	});

	it('refuses an unversioned state with no tempo to identify it', () => {
		expect(() => upgrade({} as any)).toThrow(/Unable to upgrade/);
	});

	it('refuses the unwritten 0.6.0 version', () => {
		expect(() => upgrade({ version: '0.6.0', tempo: 120 } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		expect(needsUpgrade({ tempo: 120 } as any)).toBe(true);
		expect(needsUpgrade(upgrade({ tempo: 120 } as any) as any)).toBe(false);
	});
});
