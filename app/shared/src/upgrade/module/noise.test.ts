import { describe, it, expect } from 'vitest';
import { NOISE_STATE, NOISE_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './noise';

describe('Noise Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: NOISE_STATE['0.5.13'] = {
        version: '0.5.13',
        level: 1,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for older versions', () => {
      const state: NOISE_STATE['0.5.0'] = {
        version: '0.5.0',
      };
      expect(needsUpgrade(state)).toBe(true);
    });

    it('should return true for state without version', () => {
      const state = {};
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade 0.5.0 to 0.5.13', () => {
      const state: NOISE_STATE['0.5.0'] = {
        version: '0.5.0',
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.13');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0' };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
