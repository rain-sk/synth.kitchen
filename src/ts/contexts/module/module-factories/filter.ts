import { ModuleProps } from '../components/module';
import { IoType } from '../components/io-interface';
import { guid } from '../utils/guid';
import { SynthKitchenContext } from '../audio-context';

export const createFilter = (node = SynthKitchenContext.createBiquadFilter()): ModuleProps => {
  return {
    node,
    guid: guid(),
    inputs: [{
      guid: guid(),
      name: 'input',
      type: IoType.Input,
      target: node,

    }],
    outputs: [{
      guid: guid(),
      name: 'output',
      type: IoType.Output,
      target: node,
    }],
    mods: [{
      guid: guid(),
      name: 'detune',
      type: IoType.Mod,
      target: node,
      accessor: 'detune',
    }, {
      guid: guid(),
      name: 'frequency',
      type: IoType.Mod,
      target: node,
      accessor: 'frequency',
    }, {
      guid: guid(),
      name: 'gain',
      type: IoType.Mod,
      target: node,
      accessor: 'gain',
    }, {
      guid: guid(),
      name: 'Q',
      type: IoType.Mod,
      target: node,
      accessor: 'Q',
    }],
    params: [{
      guid: guid(),
      name: 'type',
      type: IoType.Param,
      target: node,
      accessor: 'type',
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