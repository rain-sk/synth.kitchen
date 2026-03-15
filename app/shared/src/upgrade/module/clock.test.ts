import { describe, it, expect } from 'vitest';
import { CLOCK_STATE, CLOCK_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './clock';

describe('Clock Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: CLOCK_STATE['0.5.0'] = {
        version: '0.5.0',
        tempo: 120,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = { tempo: 120 };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = { tempo: 120 };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', tempo: 120 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
