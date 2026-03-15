import { describe, it, expect } from 'vitest';
import { PAN_STATE, PAN_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './pan';

describe('Pan Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: PAN_STATE['0.5.0'] = {
        version: '0.5.0',
        pan: 0,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = { pan: 0 };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = { pan: 0 };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', pan: 0 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
