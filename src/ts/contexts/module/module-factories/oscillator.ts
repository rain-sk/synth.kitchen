import { ModuleProps } from '../components/module';
import { IoType } from '../components/io-interface';
import { guid } from '../utils/guid';
import { SynthKitchenContext } from '../audio-context';

export const createOscillator = (node = SynthKitchenContext.createOscillator()): ModuleProps => {
  return {
    node,
    guid: guid(),
    inputs: [],
    outputs: [{
      guid: guid(),
      name: 'output',
      type: IoType.Output,
      target: node,
    }],
    mods: [{
      guid: guid(),
      name: 'frequency',
      type: IoType.Mod,
      target: node,
      accessor: 'frequency',
    }, {
      guid: guid(),
      name: 'detune',
      type: IoType.Mod,
      target: node,
      accessor: 'detune',
    }],
    params: [{
      guid: guid(),
      name: 'type',
      type: IoType.Param,
      target: node,
      accessor: 'type',
      options: [
        'sine',
        'square',
        'sawtooth',
        'triangle'
      ]
    }]
  }
}