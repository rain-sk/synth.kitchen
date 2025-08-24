import { TBiquadFilterType, TOscillatorType } from 'standardized-audio-context';

export type ModuleType =
	| 'CLOCK'
	| 'COMPRESSOR'
	| 'DELAY'
	| 'ENVELOPE'
	| 'FILTER'
	| 'GAIN'
	| 'GATE'
	| 'LIMITER'
	| 'MIDI_CC'
	| 'MIDI_CLOCK'
	| 'MIDI_TRIGGER'
	| 'NOISE'
	| 'OSCILLATOR'
	| 'OUTPUT'
	| 'PAN'
	| 'SEQUENCER'
	| 'SHIFT'
	| 'VCA';

export const UnitMap = {
	CLOCK: {
		tempo: 'bpm',
	},
	COMPRESSOR: {
		attack: 'sec',
		release: 'sec',
		knee: 'dB',
		ratio: '',
		threshold: '',
	},
	MIDI_CC: { input: '', cc: '', min: 'cv', max: 'cv' },
	MIDI_CLOCK: { input: '' },
	MIDI_TRIGGER: { input: '', note: '' },
	GAIN: {
		gain: '',
	},
	LIMITER: {},
	NOISE: {},
	DELAY: {
		delayTime: 'sec',
	},
	ENVELOPE: {
		gate: '',
		attack: 'sec',
		decay: 'sec',
		sustain: '',
		release: 'sec',
		peak: '',
	},
	FILTER: {
		frequency: 'hz',
		detune: 'ct',
		Q: '',
		gain: '',
		type: '',
	},
	GATE: { gate: '' },
	OSCILLATOR: {
		frequency: 'hz',
		detune: 'ct',
		waveform: '',
	},
	PAN: {
		pan: '',
	},
	SEQUENCER: {
		steps: '',
		step0: '',
		step1: '',
		step2: '',
		step3: '',
		step4: '',
		step5: '',
		step6: '',
		step7: '',
	},
	SHIFT: {
		inputMin: '',
		inputMax: '',
		outputMin: '',
		outputMax: '',
	},
	OUTPUT: {
		gain: '',
	},
	VCA: {
		gate: '',
		attack: 'sec',
		decay: 'sec',
		sustain: '',
		release: 'sec',
		peak: '',
	},
};

export interface IModuleState extends Record<ModuleType, any> {
	CLOCK: { tempo: number };
	COMPRESSOR: {
		attack: number;
		release: number;
		knee: number;
		ratio: number;
		threshold: number;
	};
	MIDI_CC: { input: string; cc: number; min: number; max: number };
	MIDI_CLOCK: { input: string };
	MIDI_TRIGGER: { input: string; note: 'all' | number };
	GAIN: {
		gain: number;
	};
	LIMITER: {};
	NOISE: {};
	DELAY: {
		delayTime: number;
	};
	ENVELOPE: {
		gate: number;
		attack: number;
		decay: number;
		sustain: number;
		release: number;
		peak: number;
	};
	FILTER: {
		frequency: number;
		detune: number;
		Q: number;
		gain: number;
		type: TBiquadFilterType;
	};
	GATE: { gate: number };
	OSCILLATOR: {
		frequency: number;
		detune: number;
		waveform: TOscillatorType;
	};
	PAN: {
		pan: number;
	};
	SEQUENCER: {
		steps: number;
		step0: number;
		step1: number;
		step2: number;
		step3: number;
		step4: number;
		step5: number;
		step6: number;
		step7: number;
	};
	SHIFT: {
		inputMin: number;
		inputMax: number;
		outputMin: number;
		outputMax: number;
	};
	OUTPUT: {
		gain: number;
	};
	VCA: {
		gate: number;
		attack: number;
		decay: number;
		sustain: number;
		release: number;
		peak: number;
	};
}

export type IModule<T extends ModuleType = ModuleType> = {
	name: string;
	moduleKey: string;
	type: T;
	state?: IModuleState[T];
};
