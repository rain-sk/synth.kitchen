import { describe, it, expect } from 'vitest';
import { GATE_STATE, GATE_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './gate';

describe('Gate Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: GATE_STATE['0.5.0'] = {
        version: '0.5.0',
        gate: 0.5,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = { gate: 0.5 };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = { gate: 0.5 };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', gate: 0.5 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
