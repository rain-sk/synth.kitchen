import { createDelay, createDistortion, createFilter, createGain, createOscillator } from ".";
import { ModuleProps } from '../../../components/module';
import { createReverb } from './reverb';
import { createLfo } from './lfo';

export enum ModuleType {
  GAIN = 'GAIN',
  OSCILLATOR = 'OSCILLATOR',
  FILTER = 'FILTER',
  DISTORTION = 'DISTORTION',
  DELAY = 'DELAY',
  REVERB = 'REVERB',
  LFO = 'LFO'
}

export const createModule = (type: ModuleType): ModuleProps | undefined => {
  return type === ModuleType.GAIN
    ? createGain()
    : (type === ModuleType.OSCILLATOR)
      ? createOscillator()
      : (type === ModuleType.FILTER)
        ? createFilter()
        : (type === ModuleType.DISTORTION)
          ? createDistortion()
          : (type === ModuleType.DELAY)
            ? createDelay()
            : (type === ModuleType.REVERB)
              ? createReverb()
              : (type === ModuleType.LFO)
                ? createLfo()
                : undefined;
}