import { ModuleProps } from '../../../components/module';
import { guid } from '../../../utils/guid';
import { audioContext } from '../../../utils/audio-context';

export const createReverb = (node = audioContext.createConvolver()): ModuleProps => {
	return {
		name: 'reverb',
		node,
		id: guid(),
		inputs: [{
			guid: guid(),
			name: 'input',
			target: node,
		}],
		outputs: [{
			guid: guid(),
			name: 'output',
			target: node,
		}],
		mods: [{
			guid: guid(),
			name: 'gain',
			target: node,
			accessor: 'gain',
		}],
		params: [{
			guid: guid(),
			name: 'buffer',
			target: node,
			accessor: 'buffer',
			options: []
		}, {
			guid: guid(),
			name: 'normalize',
			target: node,
			accessor: 'normalize',
			options: [
				'true',
				'false'
			]
		}]
	}
}