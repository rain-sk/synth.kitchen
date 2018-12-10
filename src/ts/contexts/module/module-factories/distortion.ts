import { ModuleProps } from '../components/module';
import { IoType } from '../components/io-interface';
import { guid } from '../utils/guid';
import { SynthKitchenContext } from '../audio-context';

export const createDistortion = (node = SynthKitchenContext.createWaveShaper()): ModuleProps => {
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
      target: node
    }],
    mods: [{
      guid: guid(),
      name: 'detune',
      type: IoType.Mod,
      target: node,
      accessor: 'detune'
    }, {
      guid: guid(),
      name: 'frequency',
      type: IoType.Mod,
      target: node,
      accessor: 'frequency'
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
      name: 'oversample',
      type: IoType.Param,
      target: node,
      accessor: 'oversample',
      options: [
        'none',
        '2x',
        '4x',
      ]
    }]
  }
}