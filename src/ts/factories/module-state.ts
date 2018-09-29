import { IAction, IModuleState, ModuleType } from "../declarations";
import { createGain } from "./gain";
import { createOscillator } from "./oscillator";

export const createModuleState = (type: ModuleType, dispatch: (action: IAction) => void, context: AudioContext): IModuleState => {
  return type === ModuleType.GAIN
    ? createGain(dispatch, context)
    : (type === ModuleType.OSCILLATOR)
      ? createOscillator(dispatch, context)
      : {};
}