import {
  // interfaces
  IAction,
  IModuleState,
  // enums
  IOType
} from "../declarations";

export const createFilter = (dispatch: (action: IAction<{}>) => void, context: AudioContext, node = context.createBiquadFilter()): IModuleState => {
  return {
    node,
    inputs: [{
      name: 'input',
      types: [IOType.DESTINATION],
      target: node,
      dispatch
    }, {
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
      name: 'type',
      types: [IOType.PARAM],
      target: node,
      accessor: 'type',
      dispatch,
      options: [
        'lowpass',
        'highpass',
        'bandpass',
        'lowshelf',
        'highshelf',
        'peaking',
        'notch',
        'allpass',
      ]
    }]
  }
}