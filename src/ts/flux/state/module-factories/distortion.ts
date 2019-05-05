import { ModuleProps } from '../../../components/module';
import { guid } from '../../../utils/guid';
import { audioContext } from '../../../utils/audio-context';

export const createDistortion = (node = audioContext.createWaveShaper()): ModuleProps => {
	return {
		name: 'distortion',
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
			target: node
		}],
		mods: [{
			guid: guid(),
			name: 'detune',
			target: node,
			accessor: 'detune'
		}, {
			guid: guid(),
			name: 'frequency',
			target: node,
			accessor: 'frequency'
		}, {
			guid: guid(),
			name: 'gain',
			target: node,
			accessor: 'gain',
		}, {
			guid: guid(),
			name: 'Q',
			target: node,
			accessor: 'Q',
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