import { ModuleProps } from '../../../components/module';
import { guid } from '../../../utils/guid';
import { audioContext } from '../../../utils/audio-context';

export const createDelay = (node = audioContext.createDelay(0.5), input = audioContext.createChannelMerger(), output = audioContext.createChannelSplitter()): ModuleProps => {
	input.connect(node);
	node.connect(output);
	return {
		name: 'delay',
		node,
		id: guid(),
		inputs: [{
			guid: guid(),
			name: 'input',
			target: input
		}],
		outputs: [{
			guid: guid(),
			name: 'output',
			target: output
		}],
		mods: [{
			guid: guid(),
			name: 'delayTime',
			getter: () => node.delayTime.value,
			setter: (delayTime: number) => {
				const newNode = audioContext.createDelay(delayTime);
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