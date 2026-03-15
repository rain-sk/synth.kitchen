import { describe, it, expect } from 'vitest';
import { MIDI_TRIGGER_STATE, MIDI_TRIGGER_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './midi-trigger';

describe('MIDI Trigger Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: MIDI_TRIGGER_STATE['0.5.0'] = {
        version: '0.5.0',
        input: '',
        note: 'all',
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for state without version', () => {
      const state = { input: '', note: 'all' };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade state without version', () => {
      const state = { input: '', note: 'all' };
      const result = upgrade(state as any);
      expect(result.version).toBe('0.5.0');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', input: '', note: 'all' };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
