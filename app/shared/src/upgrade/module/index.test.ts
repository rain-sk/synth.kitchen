import { describe, expect, it } from 'vitest';

import { ModuleType } from '../../types';
import { moduleNeedsUpgrade, upgradeModule } from './index';

const UNKNOWN = 'TELEPATHY' as unknown as ModuleType;

describe('module upgrade dispatch', () => {
	it('routes a known type to its own migrator', () => {
		const legacy = {
			attack: 0.01,
			decay: 0.2,
			sustain: 0.6,
			release: 0.3,
			peak: 0.8,
			gate: 1,
		};

		expect(moduleNeedsUpgrade(ModuleType.VCA, legacy as any)).toBe(true);
		expect((upgradeModule(ModuleType.VCA, legacy as any) as any).version).toBe(
			'0.5.7',
		);
	});

	it('treats a missing state as nothing to do', () => {
		expect(moduleNeedsUpgrade(ModuleType.VCA, undefined as any)).toBeFalsy();
		expect(upgradeModule(ModuleType.VCA, undefined as any)).toBeUndefined();
	});

	it('names the module type when no migrator is registered for it', () => {
		const state = { version: '0.5.0' };

		expect(() => moduleNeedsUpgrade(UNKNOWN, state as any)).toThrow(
			/No migration registered for module type "TELEPATHY"/,
		);
		expect(() => upgradeModule(UNKNOWN, state as any)).toThrow(
			/No migration registered for module type "TELEPATHY"/,
		);
	});

	it('still refuses a state its migrator cannot handle', () => {
		expect(() =>
			upgradeModule(ModuleType.SEQUENCER, { version: '0.5.3' } as any),
		).toThrow(/Unable to upgrade/);
	});
});
