import { IAction, IModuleState } from "../interfaces";
import { IOType } from "../enums";

export const createGain = (dispatch: (action: IAction) => void, context: AudioContext, node = context.createGain()): IModuleState => {
  return {
    node,
    inputs: [{
      name: 'input',
      types: [IOType.DESTINATION],
      target: node,
      dispatch
    }],
    outputs: [{
      name: 'output',
      types: [IOType.SOURCE],
      target: node,
      dispatch
    }],
    mods: [{
      name: 'gain',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'gain',
      dispatch
    }],
    params: []
  }
}