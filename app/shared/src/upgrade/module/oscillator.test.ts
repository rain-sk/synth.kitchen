import { describe, it, expect } from 'vitest';
import { OSCILLATOR_STATE, OSCILLATOR_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './oscillator';

describe('Oscillator Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: OSCILLATOR_STATE['0.5.12'] = {
        version: '0.5.12',
        frequency: 440,
        transpose: 0,
        detune: 0,
        level: 1,
        waveform: 'sine',
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for older versions', () => {
      const state: OSCILLATOR_STATE['0.5.0'] = {
        version: '0.5.0',
        frequency: 440,
        detune: 0,
        waveform: 'sine',
      };
      expect(needsUpgrade(state)).toBe(true);
    });

    it('should return true for state without version field', () => {
      const state = {
        frequency: 440,
        detune: 0,
        waveform: 'sine',
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade 0.5.0 to 0.5.12', () => {
      const state: OSCILLATOR_STATE['0.5.0'] = {
        version: '0.5.0',
        frequency: 440,
        detune: 120,
        waveform: 'sine',
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.12');
      expect(result.transpose).toBe(1);
      expect(result.detune).toBe(20);
    });

    it('should upgrade 0.5.2 to 0.5.12', () => {
      const state: OSCILLATOR_STATE['0.5.2'] = {
        version: '0.5.2',
        frequency: 440,
        transpose: 0,
        detune: 50,
        waveform: 'sine',
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.12');
      expect((result as any).peak).toBe(1);
    });

    it('should upgrade 0.5.11 to 0.5.12', () => {
      const state: OSCILLATOR_STATE['0.5.11'] = {
        version: '0.5.11',
        frequency: 440,
        transpose: 0,
        detune: 0,
        peak: 1.5,
        waveform: 'sine',
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.12');
      expect(result.level).toBe(1.5);
    });

    it('should throw error for unsupported version', () => {
      const state = {
        version: '0.4.0',
        frequency: 440,
        detune: 0,
      };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
