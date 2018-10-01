import {
  // interfaces
  IAction,
  IModuleState,
  // enums
  IOType
} from "../declarations";

export const createOscillator = (dispatch: (action: IAction) => void, context: AudioContext, node = context.createOscillator()): IModuleState => {
  return {
    node,
    inputs: [],
    outputs: [{
      name: 'output',
      types: [IOType.SOURCE],
      target: node,
      dispatch
    }],
    mods: [{
      name: 'frequency',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'frequency',
      dispatch
    }, {
      name: 'detune',
      types: [IOType.A_RATE, IOType.MOD],
      target: node,
      accessor: 'detune',
      dispatch
    }],
    params: [{
      name: 'type',
      types: [IOType.PARAM],
      target: node,
      accessor: 'type',
      dispatch,
      options: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ]
    }]
  }
}