import {
  // interfaces
  IAction,
  IModuleState,
  // enums
  IOType
} from "../declarations";

export const createReverb = (dispatch: (action: IAction) => void, context: AudioContext, node = context.createConvolver()): IModuleState => {
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
    params: [{
      name: 'buffer',
      types: [IOType.PARAM],
      target: node,
      accessor: 'buffer',
      dispatch,
      options: []
    }, {
      name: 'normalize',
      types: [IOType.BOOLEAN],
      target: node,
      accessor: 'normalize',
      dispatch
    }]
  }
}