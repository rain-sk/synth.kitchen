import { describe, expect, it } from 'vitest';

import { OSCILLATOR_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './oscillator';

const CURRENT = OSCILLATOR_STATE_VERSIONS[0]; // "0.5.12"

const legacy = (detune: number) => ({
	frequency: 440,
	detune,
	waveform: 'sawtooth',
});

const cents = (detune: number) => upgrade(legacy(detune) as any) as any;

describe('oscillator upgrade: detune / transpose split', () => {
	it('leaves anything at or under a semitone entirely in detune', () => {
		expect(cents(0)).toMatchObject({ transpose: 0, detune: 0 });
		expect(cents(50)).toMatchObject({ transpose: 0, detune: 50 });
		expect(cents(100)).toMatchObject({ transpose: 0, detune: 100 });
		expect(cents(-100)).toMatchObject({ transpose: 0, detune: -100 });
	});

	it('rolls cents over into semitones past 100, keeping the sign', () => {
		expect(cents(150)).toMatchObject({ transpose: 1, detune: 50 });
		expect(cents(-150)).toMatchObject({ transpose: -1, detune: -50 });
		expect(cents(250)).toMatchObject({ transpose: 2, detune: 50 });
		expect(cents(-350)).toMatchObject({ transpose: -3, detune: -50 });
	});

	it('keeps the two parts consistent with the input in cents', () => {
		for (const input of [-420, -150, -50, 0, 50, 150, 250, 999]) {
			const out = cents(input);
			expect(
				out.transpose * 100 + out.detune,
				`round trip for ${input} cents`,
			).toBe(input);
		}
	});

	it('preserves frequency and waveform', () => {
		const out = cents(150);

		expect(out.frequency).toBe(440);
		expect(out.waveform).toBe('sawtooth');
	});
});

describe('oscillator upgrade: peak and level', () => {
	it('mirrors the introduced peak into level and leaves no peak at the current version', () => {
		const out = cents(0);

		expect(out.level).toBe(1);
		expect('peak' in out).toBe(false);
		expect(out.version).toBe(CURRENT);
	});

	it('carries an existing peak forward into level rather than resetting it', () => {
		const out = upgrade({
			version: '0.5.11',
			frequency: 220,
			detune: 0,
			transpose: 0,
			waveform: 'square',
			peak: 0.5,
		} as any) as any;

		expect(out.level).toBe(0.5);
		expect(out.version).toBe(CURRENT);
	});

	it('drops peak once it has been mirrored into level', () => {
		const out = cents(0);

		expect(out.level).toBe(1);
		expect('peak' in out).toBe(false);
	});

	it('drops a carried-forward peak too, not just the default one', () => {
		const out = upgrade({
			version: '0.5.11',
			frequency: 220,
			detune: 0,
			transpose: 0,
			waveform: 'square',
			peak: 0.5,
		} as any) as any;

		expect(out.level).toBe(0.5);
		expect('peak' in out).toBe(false);
	});

	it('produces exactly the fields the current state declares', () => {
		const out = cents(0);

		expect(Object.keys(out).sort()).toEqual(
			[
				'version',
				'transpose',
				'frequency',
				'detune',
				'level',
				'waveform',
			].sort(),
		);
	});
});

describe('oscillator upgrade: refusals', () => {
	it('refuses an unversioned state missing any identifying key', () => {
		const { waveform, ...partial } = legacy(0);

		expect(() => upgrade(partial as any)).toThrow(/Unable to upgrade/);
	});

	it('refuses a version with no migration', () => {
		expect(() => upgrade({ version: '0.5.3', frequency: 1 } as any)).toThrow(
			/Unable to upgrade/,
		);
	});

	it('needsUpgrade agrees with upgrade', () => {
		expect(needsUpgrade(legacy(0) as any)).toBe(true);
		expect(needsUpgrade(cents(0) as any)).toBe(false);
	});
});
