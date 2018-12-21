import { createDelay, createDistortion, createFilter, createGain, createOscillator } from ".";
import { ModuleProps } from '../../../components/module';
import { createReverb } from './reverb';

export type ModuleType =
	| 'GAIN'
	| 'OSCILLATOR'
	| 'FILTER'
	| 'DISTORTION'
	| 'DELAY'
	| 'REVERB';

export const createModuleState = (type: ModuleType): ModuleProps | undefined => {
  return type === 'GAIN'
    ? createGain()
    : (type === 'OSCILLATOR')
      ? createOscillator()
      : (type === 'FILTER')
        ? createFilter()
        : (type === 'DISTORTION')
          ? createDistortion()
          : (type === 'DELAY')
            ? createDelay()
			: (type === 'REVERB')
				? createReverb()
				: undefined;
}