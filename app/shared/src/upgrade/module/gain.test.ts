import { describe, it, expect } from 'vitest';
import { GAIN_STATE, GAIN_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './gain';

describe('Gain Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: GAIN_STATE['0.5.0'] = {
        version: '0.5.0',
        gain: 1,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = {
        gain: 0.5,
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = {
        gain: 0.8,
      };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });
  });
});
