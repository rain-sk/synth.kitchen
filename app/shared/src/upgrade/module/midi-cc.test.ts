import { describe, it, expect } from 'vitest';
import { MIDI_CC_STATE, MIDI_CC_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './midi-cc';

describe('MIDI CC Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: MIDI_CC_STATE['0.5.9'] = {
        version: '0.5.9',
        input: '',
        cc: 32,
        channel: 1,
        min: 0,
        max: 1,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for older versions', () => {
      const state: MIDI_CC_STATE['0.5.0'] = {
        version: '0.5.0',
        input: '',
        cc: 32,
        min: 0,
        max: 1,
      };
      expect(needsUpgrade(state)).toBe(true);
    });

    it('should return true for state without version', () => {
      const state = {
        input: '',
        cc: 32,
        min: 0,
        max: 1,
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade 0.5.0 to 0.5.9', () => {
      const state: MIDI_CC_STATE['0.5.0'] = {
        version: '0.5.0',
        input: '',
        cc: 32,
        min: 0,
        max: 1,
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.9');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', input: '', cc: 32 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
