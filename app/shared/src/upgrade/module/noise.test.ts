import { describe, expect, it } from 'vitest';

import { NOISE_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './noise';

const CURRENT = NOISE_STATE_VERSIONS[0]; // "0.5.13"

describe('noise upgrade', () => {
	it('gives a legacy noise state the default level', () => {
		const out = upgrade({ version: '0.5.0' } as any) as any;

		expect(out.version).toBe(CURRENT);
		expect(out.level).toBe(1);
	});

	it('stamps an unversioned state and gives it the default level', () => {
		const out = upgrade({} as any) as any;

		expect(out.version).toBe(CURRENT);
		expect(out.level).toBe(1);
	});

	it('produces exactly the fields the current state declares', () => {
		const declared = ['version', 'level'];

		expect(Object.keys(upgrade({} as any) as any).sort()).toEqual(
			declared.sort(),
		);
	});

	it('passes the current version through untouched', () => {
		const out = upgrade({ version: CURRENT, level: 0.25 } as any) as any;

		expect(out.level).toBe(0.25);
		expect(out.version).toBe(CURRENT);
	});

	it('refuses a version with no migration', () => {
		expect(() => upgrade({ version: '0.5.7' } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		expect(needsUpgrade({ version: '0.5.0' } as any)).toBe(true);
		expect(needsUpgrade(upgrade({} as any) as any)).toBe(false);
	});
});
