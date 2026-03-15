import { describe, it, expect } from 'vitest';
import { SHIFT_STATE, SHIFT_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './shift';

describe('Shift Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: SHIFT_STATE['0.5.0'] = {
        version: '0.5.0',
        inputMin: -1,
        inputMax: 1,
        outputMin: 0,
        outputMax: 12,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = {
        inputMin: -1,
        inputMax: 1,
        outputMin: 0,
        outputMax: 12,
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = {
        inputMin: -1,
        inputMax: 1,
        outputMin: 0,
        outputMax: 12,
      };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', inputMin: -1 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
