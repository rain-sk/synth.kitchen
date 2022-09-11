import { ModuleType } from '../../../synth-kitchen-old/state/patch';

export type IModuleState = {
	GLOBAL_CONTEXT: {};
	GAIN: {};
	DELAY: {};
	FILTER: {};
	OSCILLATOR: {
		frequency: number;
		detune: number;
		waveform: 'sine' | 'square' | 'triangle' | 'sawtooth' | 'custom';
	};
	SEQUENCER: {
		mode: 'forward' | 'backward';
		steps: {
			offset: number;
			duration: number;
		}[];
	};
	MIDI_DEVICE: {};
	MIDI_OSCILLATOR: {};
};

export enum ModuleSelectionState {
	POTENTIALLY_SELECTED,
	SELECTED,
	UNSELECTED
}

export type IModule<T extends ModuleType = ModuleType> = {
	moduleKey: string;
	type: T;
	x: number;
	y: number;
	width: number;
	height: number;
	selectionState: ModuleSelectionState;
	state?: IModuleState[T];
};
