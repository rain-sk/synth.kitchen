import { describe, it, expect } from 'vitest';
import { SCOPE_STATE, SCOPE_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './scope';

describe('Scope Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: SCOPE_STATE['0.5.7'] = {
        version: '0.5.7',
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = {};
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = {};
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.7');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0' };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
