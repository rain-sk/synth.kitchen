import { ModuleType } from 'synth.kitchen-shared';

export const MODULE_COLORS = {
	[ModuleType.CLOCK]: '#e3acaf',
	[ModuleType.COMPRESSOR]: '#74dae1',
	[ModuleType.DELAY]: '#9bd2f0',
	[ModuleType.ENVELOPE]: '#aec27e',
	[ModuleType.FILTER]: '#72ddc5',
	[ModuleType.GAIN]: '#c1c9f0',
	[ModuleType.GATE]: '#bff1bc',
	[ModuleType.LIMITER]: '#dcc0f0',
	[ModuleType.MIDI_CC]: '#85d9a8',
	[ModuleType.MIDI_CLOCK]: '#eac2a5',
	[ModuleType.MIDI_TRIGGER]: '#f1b8d3',
	[ModuleType.NOISE]: '#f1bcce',
	[ModuleType.OSCILLATOR]: '#6ee198',
	[ModuleType.OUTPUT]: '#6f5e4b',
	[ModuleType.PAN]: '#f1bae4',
	[ModuleType.SCOPE]: '#c5d9a0',
	[ModuleType.SEQUENCER]: '#aabae0',
	[ModuleType.SHIFT]: '#9cade8',
	[ModuleType.VCA]: '#81c8ad',
} as const;
