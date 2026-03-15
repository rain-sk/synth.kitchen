import { describe, it, expect } from 'vitest';
import { VCA_STATE, VCA_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './vca';

describe('VCA Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: VCA_STATE['0.5.7'] = {
        version: '0.5.7',
        hold: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 1,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for older versions', () => {
      const state: VCA_STATE['0.5.0'] = {
        version: '0.5.0',
        gate: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 1,
      };
      expect(needsUpgrade(state)).toBe(true);
    });

    it('should return true for state without version', () => {
      const state = {
        gate: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 1,
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade 0.5.0 to 0.5.7', () => {
      const state: VCA_STATE['0.5.0'] = {
        version: '0.5.0',
        gate: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 1,
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.7');
    });

    it('should upgrade 0.5.4 to 0.5.7', () => {
      const state: VCA_STATE['0.5.4'] = {
        version: '0.5.4',
        hold: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 1,
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.7');
    });

    it('should upgrade 0.5.5 to 0.5.7', () => {
      const state: VCA_STATE['0.5.5'] = {
        version: '0.5.5',
        gate: 0.1,
        attack: 0.05,
        decay: 0.05,
        sustain: 1,
        release: 0.1,
        peak: 1,
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.7');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', gate: 0.1 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
