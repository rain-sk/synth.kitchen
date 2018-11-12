import { IAction, IModuleState, ModuleType } from "../declarations";
import { createDelay, createDistortion, createFilter, createGain, createOscillator } from ".";

export const createModuleState = (type: ModuleType, dispatch: (action: IAction<{}>) => void, context: AudioContext): IModuleState => {
  return type === ModuleType.GAIN
    ? createGain(dispatch, context)
    : (type === ModuleType.OSCILLATOR)
      ? createOscillator(dispatch, context)
      : (type === ModuleType.BIQUAD_FILTER)
        ? createFilter(dispatch, context)
        : (type === ModuleType.DISTORTION)
          ? createDistortion(dispatch, context)
          : (type === ModuleType.DELAY)
            ? createDelay(dispatch, context)
            : {};
}