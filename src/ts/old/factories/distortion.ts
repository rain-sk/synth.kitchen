import {
  // interfaces
  IAction,
  IModuleState,
  // enums
  IOType
} from "../declarations";

export const createDistortion = (dispatch: (action: IAction<{}>) => void, context: AudioContext, node = context.createWaveShaper()): IModuleState => {
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
      name: 'detune',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'detune',
      dispatch
    }, {
      name: 'frequency',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'frequency',
      dispatch
    }, {
      name: 'gain',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'gain',
      dispatch
    }, {
      name: 'Q',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'Q',
      dispatch
    }],
    params: [{
      name: 'oversample',
      types: [IOType.PARAM],
      target: node,
      accessor: 'oversample',
      dispatch,
      options: [
        'none',
        '2x',
        '4x',
      ]
    }]
  }
}