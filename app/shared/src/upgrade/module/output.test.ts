import { describe, it, expect } from 'vitest';
import { OUTPUT_STATE, OUTPUT_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './output';

describe('Output Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: OUTPUT_STATE['0.5.0'] = {
        version: '0.5.0',
        gain: 0.45,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = { gain: 0.45 };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = { gain: 0.45 };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', gain: 0.45 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
