import { ModuleProps } from '../../../components/module';
import { guid } from '../../../utils/guid';
import { audioContext } from '../../../utils/audio-context';

export const createFilter = (node = audioContext.createBiquadFilter()): ModuleProps => {
	return {
		name: 'filter',
		node,
		guid: guid(),
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
			name: 'detune',
			target: node,
			accessor: 'detune',
		}, {
			guid: guid(),
			name: 'frequency',
			target: node,
			accessor: 'frequency',
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
			name: 'type',
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