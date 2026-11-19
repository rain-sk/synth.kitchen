import { describe, expect, it } from 'vitest';

import { ModuleType } from '../types';
import {
	CONNECTIONS_STATE_VERSIONS,
	ioKey,
	IoType,
} from '../types/patch/connection';
import {
	connectionsStateNeedsUpgrade,
	upgradeConnectionsState,
} from './connections-state';

const CURRENT = CONNECTIONS_STATE_VERSIONS[0];

const output = { moduleId: 'osc', type: IoType.output, channel: 0 };
const gateInput = {
	moduleId: 'env',
	type: IoType.input,
	channel: 0,
	name: 'gate',
};

const keyOf = (input: any) => `${ioKey(output as any)}|${ioKey(input as any)}`;

const patchWith = (inputName: string, moduleType: ModuleType) => {
	const input = { ...gateInput, name: inputName };
	return {
		version: '0.5.6',
		name: 'patch',
		modules: { env: { id: 'env', type: moduleType, state: {} } } as any,
		connections: {
			version: '0.5.6',
			state: { [keyOf(input)]: [output, input] },
		},
	} as any;
};

describe('connections-state upgrade', () => {
	it('renames a gate input to hold on modules that are not a GATE', () => {
		const upgraded = upgradeConnectionsState(
			patchWith('gate', ModuleType.FILTER),
		) as any;

		expect(upgraded.version).toBe(CURRENT);
		const [storedOutput, storedInput] = Object.values(upgraded.state)[0] as any;
		expect(storedInput.name).toBe('hold');
		expect(storedOutput.name).toBeUndefined();
	});

	it('leaves a real GATE module input alone', () => {
		const upgraded = upgradeConnectionsState(
			patchWith('gate', ModuleType.GATE),
		) as any;

		const [, storedInput] = Object.values(upgraded.state)[0] as any;
		expect(storedInput.name).toBe('gate');
	});

	it('leaves inputs that were never named gate alone', () => {
		const upgraded = upgradeConnectionsState(
			patchWith('frequency', ModuleType.FILTER),
		) as any;

		const [, storedInput] = Object.values(upgraded.state)[0] as any;
		expect(storedInput.name).toBe('frequency');
	});

	it('does not move the map key when the input is renamed', () => {
		const before = keyOf(gateInput);
		const upgraded = upgradeConnectionsState(
			patchWith('gate', ModuleType.FILTER),
		) as any;

		expect(Object.keys(upgraded.state)).toEqual([before]);
	});

	it('reports nothing left to upgrade once current', () => {
		const upgraded = upgradeConnectionsState(
			patchWith('gate', ModuleType.FILTER),
		) as any;

		expect(connectionsStateNeedsUpgrade(upgraded)).toBe(false);
	});
});
