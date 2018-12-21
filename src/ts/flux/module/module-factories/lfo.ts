import { ModuleProps } from '../../../components/module';
import { guid } from '../../../utils/guid';
import { audioContext } from '../../../utils/audio-context';

export const createLfo = (): ModuleProps => {
	const osc = audioContext.createOscillator();
	const gain = audioContext.createGain();
	osc.connect(gain);
	osc.start();
	return {
		name: 'lfo',
		node: [osc, gain],
		guid: guid(),
		inputs: [],
		outputs: [{
			guid: guid(),
			name: 'output',
			target: osc
		}],
		mods: [{
			guid: guid(),
			name: 'frequency',
			target: osc,
			accessor: 'frequency'
		}, {
			guid: guid(),
			name: 'detune',
			target: osc,
			accessor: 'detune'
		}, {
			guid: guid(),
			name: 'mod',
			target: gain,
			accessor: 'gain'
		}],
		params: [{
			guid: guid(),
			name: 'waveform',
			target: osc,
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