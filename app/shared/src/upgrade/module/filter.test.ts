import { describe, it, expect } from 'vitest';
import { FILTER_STATE, FILTER_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './filter';

describe('Filter Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: FILTER_STATE['0.5.12'] = {
        version: '0.5.12',
        frequency: 500,
        transpose: 0,
        detune: 0,
        Q: 0.3,
        gain: 1,
        type: 'lowpass',
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for older versions', () => {
      const state: FILTER_STATE['0.5.0'] = {
        version: '0.5.0',
        frequency: 500,
        detune: 50,
        Q: 0.3,
        gain: 1,
        type: 'lowpass',
      };
      expect(needsUpgrade(state)).toBe(true);
    });

    it('should return true for state without version', () => {
      const state = {
        frequency: 500,
        detune: 50,
        Q: 0.3,
        gain: 1,
        type: 'lowpass',
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade 0.5.0 to 0.5.12', () => {
      const state: FILTER_STATE['0.5.0'] = {
        version: '0.5.0',
        frequency: 500,
        detune: 120,
        Q: 0.3,
        gain: 1,
        type: 'lowpass',
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.12');
      expect(result.transpose).toBe(1);
      expect(result.detune).toBe(20);
    });

    it('should upgrade 0.5.11 to 0.5.12', () => {
      const state: FILTER_STATE['0.5.11'] = {
        version: '0.5.11',
        frequency: 500,
        transpose: 0,
        detune: 50,
        Q: 0.3,
        gain: 1,
        type: 'lowpass',
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.12');
    });

    it('should throw error for unsupported version', () => {
      const state = {
        version: '0.4.0',
        frequency: 500,
        detune: 50,
        Q: 0.3,
        gain: 1,
        type: 'lowpass',
      };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
