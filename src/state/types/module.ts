import { TBiquadFilterType, TOscillatorType } from 'standardized-audio-context';

export type ModuleType =
	| 'CLOCK'
	| 'MIDI_CLOCK'
	| 'MIDI_TRIGGER'
	| 'DELAY'
	| 'ENVELOPE'
	| 'FILTER'
	| 'GAIN'
	| 'GATE'
	| 'LIMITER'
	| 'NOISE'
	| 'OSCILLATOR'
	| 'OUTPUT'
	| 'PAN'
	| 'SEQUENCER'
	| 'VCA';

export interface IModuleState extends Record<ModuleType, any> {
	CLOCK: { tempo: number };
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
