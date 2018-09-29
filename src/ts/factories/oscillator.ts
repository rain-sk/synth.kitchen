import { IOType } from "../enums";
import { IAction, IModuleState } from "../interfaces";

export const createOscillator = (dispatch: (action: IAction) => void, context: AudioContext, node = context.createOscillator()): IModuleState => {
  return {
    node,
    inputs: [],
    outputs: [{
      name: 'output',
      types: [IOType.SOURCE],
      target: node,
      dispatch: dispatch
    }],
    mods: [{
      name: 'frequency',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'frequency',
      dispatch: dispatch
    }, {
      name: 'detune',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'detune',
      dispatch: dispatch
    }],
    params: [{
      name: 'type',
      types: [IOType.A_RATE, IOType.PARAM],
      target: node,
      accessor: 'type',
      dispatch: dispatch
    }]
  }
}