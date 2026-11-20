import { describe, expect, it } from 'vitest';

import { PATCH_STATE_VERSIONS } from '../types/patch';
import { upgradeConnectionsState } from './connections-state';
import { patchStateNeedsUpgrade, upgradePatchState } from './patch-state';

const CURRENT = PATCH_STATE_VERSIONS[0];

const legacyConnectionsFor = (patchVersion?: string) =>
	patchVersion === '0.5.6' || patchVersion === undefined
		? { version: '0.5.5' }
		: { version: '0.5.7', state: {} };

const stateAt = (version?: string) =>
	({
		version,
		name: 'legacy patch',
		modules: {},
		modulePositions: {},
		connections: legacyConnectionsFor(version),
	}) as any;

describe('upgradePatchState', () => {
	it('leaves a state already current, and reports nothing to upgrade', () => {
		const state = stateAt(CURRENT);

		const upgraded = upgradePatchState(state);

		expect(upgraded.version).toBe(CURRENT);
		expect(patchStateNeedsUpgrade(upgraded)).toBe(false);
	});

	it('walks every declared legacy version up to the current one', () => {
		for (const version of PATCH_STATE_VERSIONS.slice(1)) {
			const upgraded = upgradePatchState(stateAt(version));

			expect(upgraded.version, `version after upgrade`).toBe(CURRENT);
			expect(
				patchStateNeedsUpgrade(upgraded),
				`still needs upgrade after upgrading ${version}`,
			).toBe(false);
		}
	});

	it('refuses a state at a version it has no migration for, instead of returning it unmigrated', () => {
		const unknown = stateAt('0.5.99');

		expect(patchStateNeedsUpgrade(unknown)).toBe(true);

		expect(() => upgradePatchState(unknown)).toThrow();
	});
});

describe('upgradeConnectionsState', () => {
	it('throws on a connections state version it cannot migrate', () => {
		expect(() =>
			upgradeConnectionsState({
				version: '0.5.6',
				modules: {},
				connections: { version: '0.5.99' },
			} as any),
		).toThrow(/Unable to upgrade/);
	});

	it('cascades 0.5.5 through to the current version', () => {
		const upgraded = upgradeConnectionsState({
			version: '0.5.6',
			modules: {},
			connections: { version: '0.5.5' },
		} as any);

		expect(upgraded.version).toBe('0.5.7');
	});
});
