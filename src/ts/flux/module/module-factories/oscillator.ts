import { ModuleProps } from '../../../components/module';
import { guid } from '../../../utils/guid';
import { audioContext } from '../../../utils/audio-context';

export const createOscillator = (node = audioContext.createOscillator()): ModuleProps => {
	return {
		name: 'oscillator',
		node,
		guid: guid(),
		inputs: [],
		outputs: [{
			guid: guid(),
			name: 'output',
			target: node,
		}],
		mods: [{
			guid: guid(),
			name: 'frequency',
			target: node,
			accessor: 'frequency',
		}, {
			guid: guid(),
			name: 'detune',
			target: node,
			accessor: 'detune',
		}],
		params: [{
			guid: guid(),
			name: 'type',
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