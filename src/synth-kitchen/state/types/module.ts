import { TBiquadFilterType, TOscillatorType } from 'standardized-audio-context';

export type ModuleType =
	| 'DELAY'
	| 'FILTER'
	| 'GAIN'
	| 'NOISE'
	| 'OSCILLATOR'
	| 'OUTPUT'
	| 'SEQUENCER';

export interface IModuleState extends Record<ModuleType, any> {
	GAIN: {
		gain: number;
	};
	NOISE: {};
	DELAY: {
		delayTime: number;
	};
	FILTER: {
		frequency: number;
		detune: number;
		Q: number;
		gain: number;
		type: TBiquadFilterType;
	};
	OSCILLATOR: {
		frequency: number;
		detune: number;
		waveform: TOscillatorType;
	};
	SEQUENCER: {
		mode: 'forward' | 'backward';
		glide: number;
		steps: {
			offset: number;
			duration: number;
			reverse: boolean;
		}[];
	};
	OUTPUT: {
		gain: number;
	};
}

export type IModuleIoInfo = { inputs: string[]; outputs: string[] };

export const ModuleIo: Record<ModuleType, IModuleIoInfo> = {
	GAIN: { inputs: ['in'], outputs: ['out'] },
	NOISE: { inputs: [], outputs: ['out'] },
	DELAY: {
		inputs: ['in'],
		outputs: ['out']
	},
	FILTER: { inputs: ['in'], outputs: ['out'] },
	OSCILLATOR: { inputs: [], outputs: ['out'] },
	SEQUENCER: { inputs: [], outputs: ['out'] },
	OUTPUT: { inputs: ['in'], outputs: [] }
};

export type IModule<T extends ModuleType = ModuleType> = {
	name: string;
	moduleKey: string;
	type: T;
	x: number;
	y: number;
	state?: IModuleState[T];
};

export type IOscillatorModule = IModule<'OSCILLATOR'>;
