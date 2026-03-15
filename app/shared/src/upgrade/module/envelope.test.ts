import { describe, it, expect } from 'vitest';
import { ENVELOPE_STATE, ENVELOPE_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './envelope';

describe('Envelope Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: ENVELOPE_STATE['0.5.7'] = {
        version: '0.5.7',
        hold: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 100,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for older versions', () => {
      const state: ENVELOPE_STATE['0.5.0'] = {
        version: '0.5.0',
        gate: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 100,
      };
      expect(needsUpgrade(state)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade to latest version', () => {
      const state: ENVELOPE_STATE['0.5.0'] = {
        version: '0.5.0',
        gate: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 100,
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.7');
    });
  });
});
