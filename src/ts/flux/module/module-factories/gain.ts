import { ModuleProps } from '../../../components/module';
import { guid } from '../../../utils/guid';
import { audioContext } from '../../../utils/audio-context';

export const createGain = (node = audioContext.createGain()): ModuleProps => {
	return {
		name: 'gain',
		node,
		guid: guid(),
		inputs: [{
			guid: guid(),
			name: 'input',
			target: node
		}],
		outputs: [{
			guid: guid(),
			name: 'output',
			target: node
		}],
		mods: [{
			guid: guid(),
			name: 'gain',
			target: node,
			accessor: 'gain'
		}],
		params: []
	}
}