import { createDelay, createDistortion, createFilter, createGain, createOscillator } from ".";
import { ModuleType } from '../types/module';
import { ModuleProps } from '../components/module';

export const createModuleState = (type: ModuleType): ModuleProps | {} => {
  return type === ModuleType.GAIN
    ? createGain()
    : (type === ModuleType.OSCILLATOR)
      ? createOscillator()
      : (type === ModuleType.BIQUAD_FILTER)
        ? createFilter()
        : (type === ModuleType.DISTORTION)
          ? createDistortion()
          : (type === ModuleType.DELAY)
            ? createDelay()
            : {};
}