import { ModuleProps } from '../components/module';
import { IoType } from '../components/io-interface';
import { guid } from '../utils/guid';
import { SynthKitchenContext } from '../audio-context';

export const createDelay = (node = SynthKitchenContext.createDelay(0.5), input = SynthKitchenContext.createChannelMerger(), output = SynthKitchenContext.createChannelSplitter()): ModuleProps => {
  input.connect(node);
  node.connect(output);
  return {
    node,
    guid: guid(),
    inputs: [{
      guid: guid(),
      name: 'input',
      type: IoType.Input,
      target: input
    }],
    outputs: [{
      guid: guid(),
      name: 'output',
      type: IoType.Output,
      target: output
    }],
    mods: [{
      guid: guid(),
      name: 'delayTime',
      type: IoType.Mod,
      getter: () => node.delayTime,
      setter: (delayTime: number) => {
        const newNode = SynthKitchenContext.createDelay(delayTime);
        input.connect(newNode);
        input.disconnect(node);
        newNode.connect(output);
        node.disconnect(output);
        node = newNode;
      }
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