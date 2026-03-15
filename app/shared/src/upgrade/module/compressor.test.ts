import { describe, it, expect } from 'vitest';
import { COMPRESSOR_STATE, COMPRESSOR_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './compressor';

describe('Compressor Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: COMPRESSOR_STATE['0.5.0'] = {
        version: '0.5.0',
        attack: 0.003,
        release: 0.25,
        knee: 30,
        ratio: 12,
        threshold: -24,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = {
        attack: 0.003,
        release: 0.25,
        knee: 30,
        ratio: 12,
        threshold: -24,
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = {
        attack: 0.003,
        release: 0.25,
        knee: 30,
        ratio: 12,
        threshold: -24,
      };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', attack: 0.003 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
