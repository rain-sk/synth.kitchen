import {
  // interfaces
  IAction,
  IModuleState,
  // enums
  IOType
} from "../declarations";

export const createDelay = (dispatch: (action: IAction) => void, context: AudioContext, node = context.createDelay(0.5)): IModuleState => {
  const input = context.createChannelMerger();
  const output = context.createChannelSplitter();
  input.connect(node);
  node.connect(output);
  return {
    node,
    inputs: [{
      name: 'input',
      types: [IOType.DESTINATION],
      target: input,
      dispatch
    }],
    outputs: [{
      name: 'output',
      types: [IOType.SOURCE],
      target: output,
      dispatch
    }],
    mods: [],
    params: [{
      name: 'delayTime',
      types: [IOType.A_RATE, IOType.MOD, IOType.READONLY],
      target: node,
      accessor: 'delayTime',
      dispatch
    }, {
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