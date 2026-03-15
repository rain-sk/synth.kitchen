import { describe, it, expect } from 'vitest';
import { SEQUENCER_STATE, SEQUENCER_STATE_VERSIONS } from '../../types/patch/module';
import { needsUpgrade, upgrade } from './sequencer';

describe('Sequencer Upgrade', () => {
  describe('needsUpgrade', () => {
    it('should return false for latest version', () => {
      const state: SEQUENCER_STATE['0.5.8'] = {
        version: '0.5.8',
        steps: 16,
        slide: 0,
        step0: 0,
        step1: 0,
        step2: 0,
        step3: 0,
        step4: 0,
        step5: 0,
        step6: 0,
        step7: 0,
        step8: 0,
        step9: 0,
        step10: 0,
        step11: 0,
        step12: 0,
        step13: 0,
        step14: 0,
        step15: 0,
      };
      expect(needsUpgrade(state)).toBe(false);
    });

    it('should return true for older versions', () => {
      const state: SEQUENCER_STATE['0.5.1'] = {
        version: '0.5.1',
        steps: 16,
        step0: 0,
        step1: 0,
        step2: 0,
        step3: 0,
        step4: 0,
        step5: 0,
        step6: 0,
        step7: 0,
        step8: 0,
        step9: 0,
        step10: 0,
        step11: 0,
        step12: 0,
        step13: 0,
        step14: 0,
        step15: 0,
      };
      expect(needsUpgrade(state)).toBe(true);
    });

    it('should return true for state without version', () => {
      const state = {
        steps: 16,
        step0: 0,
        step1: 0,
        step2: 0,
        step3: 0,
        step4: 0,
        step5: 0,
        step6: 0,
        step7: 0,
        step8: 0,
        step9: 0,
        step10: 0,
        step11: 0,
        step12: 0,
        step13: 0,
        step14: 0,
        step15: 0,
      };
      expect(needsUpgrade(state as any)).toBe(true);
    });
  });

  describe('upgrade', () => {
    it('should upgrade 0.5.1 to 0.5.8', () => {
      const state: SEQUENCER_STATE['0.5.1'] = {
        version: '0.5.1',
        steps: 16,
        step0: 0,
        step1: 0,
        step2: 0,
        step3: 0,
        step4: 0,
        step5: 0,
        step6: 0,
        step7: 0,
        step8: 0,
        step9: 0,
        step10: 0,
        step11: 0,
        step12: 0,
        step13: 0,
        step14: 0,
        step15: 0,
      };
      const result = upgrade(state);
      expect(result.version).toBe('0.5.8');
    });

    it('should throw error for unsupported version', () => {
      const state = { version: '0.4.0', steps: 16 };
      expect(() => upgrade(state as any)).toThrow();
    });
  });
});
