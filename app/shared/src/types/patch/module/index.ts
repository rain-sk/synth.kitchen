import { CLOCK_STATE, CLOCK_STATE_VERSIONS } from "./clock";
import { COMPRESSOR_STATE, COMPRESSOR_STATE_VERSIONS } from "./compressor";
import { MIDI_CC_STATE, MIDI_CC_STATE_VERSIONS } from "./midi-cc";
import { MIDI_CLOCK_STATE, MIDI_CLOCK_STATE_VERSIONS } from "./midi-clock";
import {
  MIDI_TRIGGER_STATE,
  MIDI_TRIGGER_STATE_VERSIONS,
} from "./midi-trigger";
import { GAIN_STATE, GAIN_STATE_VERSIONS } from "./gain";
import { LIMITER_STATE, LIMITER_STATE_VERSIONS } from "./limiter";
import { NOISE_STATE, NOISE_STATE_VERSIONS } from "./noise";
import { DELAY_STATE, DELAY_STATE_VERSIONS } from "./delay";
import { ENVELOPE_STATE, ENVELOPE_STATE_VERSIONS } from "./envelope";
import { FILTER_STATE, FILTER_STATE_VERSIONS } from "./filter";
import { GATE_STATE, GATE_STATE_VERSIONS } from "./gate";
import { OSCILLATOR_STATE, OSCILLATOR_STATE_VERSIONS } from "./oscillator";
import { PAN_STATE, PAN_STATE_VERSIONS } from "./pan";
import { SEQUENCER_STATE, SEQUENCER_STATE_VERSIONS } from "./sequencer";
import { SHIFT_STATE, SHIFT_STATE_VERSIONS } from "./shift";
import { OUTPUT_STATE, OUTPUT_STATE_VERSIONS } from "./output";
import { VCA_STATE, VCA_STATE_VERSIONS } from "./vca";
import { SCOPE_STATE, SCOPE_STATE_VERSIONS } from "./scope";

export enum ModuleType {
  CLOCK = "CLOCK",
  COMPRESSOR = "COMPRESSOR",
  DELAY = "DELAY",
  ENVELOPE = "ENVELOPE",
  FILTER = "FILTER",
  GAIN = "GAIN",
  GATE = "GATE",
  LIMITER = "LIMITER",
  MIDI_CC = "MIDI_CC",
  MIDI_CLOCK = "MIDI_CLOCK",
  MIDI_TRIGGER = "MIDI_TRIGGER",
  NOISE = "NOISE",
  OSCILLATOR = "OSCILLATOR",
  OUTPUT = "OUTPUT",
  PAN = "PAN",
  SCOPE = "SCOPE",
  SEQUENCER = "SEQUENCER",
  SHIFT = "SHIFT",
  VCA = "VCA",
}

export type ModuleState = {
  [ModuleType.CLOCK]: CLOCK_STATE[CLOCK_STATE_VERSIONS[0]];
  [ModuleType.COMPRESSOR]: COMPRESSOR_STATE[COMPRESSOR_STATE_VERSIONS[0]];
  [ModuleType.DELAY]: DELAY_STATE[DELAY_STATE_VERSIONS[0]];
  [ModuleType.ENVELOPE]: ENVELOPE_STATE[ENVELOPE_STATE_VERSIONS[0]];
  [ModuleType.FILTER]: FILTER_STATE[FILTER_STATE_VERSIONS[0]];
  [ModuleType.GAIN]: GAIN_STATE[GAIN_STATE_VERSIONS[0]];
  [ModuleType.LIMITER]: LIMITER_STATE[LIMITER_STATE_VERSIONS[0]];
  [ModuleType.MIDI_CC]: MIDI_CC_STATE[MIDI_CC_STATE_VERSIONS[0]];
  [ModuleType.MIDI_CLOCK]: MIDI_CLOCK_STATE[MIDI_CLOCK_STATE_VERSIONS[0]];
  [ModuleType.MIDI_TRIGGER]: MIDI_TRIGGER_STATE[MIDI_TRIGGER_STATE_VERSIONS[0]];
  [ModuleType.NOISE]: NOISE_STATE[NOISE_STATE_VERSIONS[0]];
  [ModuleType.GATE]: GATE_STATE[GATE_STATE_VERSIONS[0]];
  [ModuleType.OSCILLATOR]: OSCILLATOR_STATE[OSCILLATOR_STATE_VERSIONS[0]];
  [ModuleType.PAN]: PAN_STATE[PAN_STATE_VERSIONS[0]];
  [ModuleType.SCOPE]: SCOPE_STATE[SCOPE_STATE_VERSIONS[0]];
  [ModuleType.SEQUENCER]: SEQUENCER_STATE[SEQUENCER_STATE_VERSIONS[0]];
  [ModuleType.SHIFT]: SHIFT_STATE[SHIFT_STATE_VERSIONS[0]];
  [ModuleType.OUTPUT]: OUTPUT_STATE[OUTPUT_STATE_VERSIONS[0]];
  [ModuleType.VCA]: VCA_STATE[VCA_STATE_VERSIONS[0]];
};

const DefaultModuleStates: ModuleState = {
  [ModuleType.CLOCK]: {
    version: "0.5.0",
    tempo: 120,
  },
  [ModuleType.COMPRESSOR]: {
    version: "0.5.0",
    attack: 0.003,
    release: 0.25,
    knee: 30,
    ratio: 12,
    threshold: -24,
  },
  [ModuleType.DELAY]: {
    version: "0.5.0",
    delayTime: 0,
  },
  [ModuleType.ENVELOPE]: {
    version: "0.5.7",
    hold: 0.1,
    attack: 0.05,
    decay: 0.05,
    sustain: 1,
    release: 0.1,
    peak: 100,
  },
  [ModuleType.FILTER]: {
    version: "0.5.0",
    frequency: 500,
    detune: 0,
    Q: 0.3,
    gain: 1,
    type: "lowpass",
  },
  [ModuleType.GAIN]: {
    version: "0.5.0",
    gain: 1,
  },
  [ModuleType.LIMITER]: {
    version: "0.5.0",
  },
  [ModuleType.MIDI_CC]: {
    version: "0.5.9",
    input: "",
    cc: 32,
    channel: 1,
    min: 0,
    max: 1,
  },
  [ModuleType.MIDI_CLOCK]: {
    version: "0.5.0",
    input: "",
  },
  [ModuleType.MIDI_TRIGGER]: {
    version: "0.5.0",
    input: "",
    note: "all",
  },
  [ModuleType.NOISE]: { version: "0.5.0" },
  [ModuleType.GATE]: {
    version: "0.5.0",
    gate: 0.5,
  },
  [ModuleType.OSCILLATOR]: {
    version: "0.5.2",
    frequency: 440,
    transpose: 0,
    detune: 0,
    waveform: "sine",
  },
  [ModuleType.PAN]: {
    version: "0.5.0",
    pan: 0,
  },
  [ModuleType.SCOPE]: {
    version: "0.5.7",
  },
  [ModuleType.SEQUENCER]: {
    version: "0.5.8",
    steps: 4,
    slide: 0,
    step0: 0,
    step1: 0,
    step2: 0,
    step3: 0,
    step4: 0,
    step5: 0,
    step6: 0,
    step7: 0,
    step8: 0,
    step9: 0,
    step10: 0,
    step11: 0,
    step12: 0,
    step13: 0,
    step14: 0,
    step15: 0,
  },
  [ModuleType.SHIFT]: {
    version: "0.5.0",
    inputMin: -1,
    inputMax: 1,
    outputMin: 0,
    outputMax: 12,
  },
  [ModuleType.OUTPUT]: {
    version: "0.5.0",
    gain: 0.45,
  },
  [ModuleType.VCA]: {
    version: "0.5.7",
    hold: 0.1,
    attack: 0.05,
    decay: 0.05,
    sustain: 1,
    release: 0.1,
    peak: 1,
  },
};

export const defaultModuleState = <T extends ModuleType>(
  type: T
): ModuleState[T] => {
  return DefaultModuleStates[type];
};

export type Module<T extends ModuleType = ModuleType> = {
  name?: string;
  id: string;
  type: T;
  state: ModuleState[T];
};

export type ModulePosition = [number, number];

export { CLOCK_STATE, CLOCK_STATE_VERSIONS } from "./clock";
export { COMPRESSOR_STATE, COMPRESSOR_STATE_VERSIONS } from "./compressor";
export { MIDI_CC_STATE, MIDI_CC_STATE_VERSIONS } from "./midi-cc";
export { MIDI_CLOCK_STATE, MIDI_CLOCK_STATE_VERSIONS } from "./midi-clock";
export {
  MIDI_TRIGGER_STATE,
  MIDI_TRIGGER_STATE_VERSIONS,
} from "./midi-trigger";
export { GAIN_STATE, GAIN_STATE_VERSIONS } from "./gain";
export { LIMITER_STATE, LIMITER_STATE_VERSIONS } from "./limiter";
export { NOISE_STATE, NOISE_STATE_VERSIONS } from "./noise";
export { DELAY_STATE, DELAY_STATE_VERSIONS } from "./delay";
export { ENVELOPE_STATE, ENVELOPE_STATE_VERSIONS } from "./envelope";
export { FILTER_STATE, FILTER_STATE_VERSIONS } from "./filter";
export { GATE_STATE, GATE_STATE_VERSIONS } from "./gate";
export { OSCILLATOR_STATE, OSCILLATOR_STATE_VERSIONS } from "./oscillator";
export { PAN_STATE, PAN_STATE_VERSIONS } from "./pan";
export { SCOPE_STATE, SCOPE_STATE_VERSIONS } from "./scope";
export { SEQUENCER_STATE, SEQUENCER_STATE_VERSIONS } from "./sequencer";
export { SHIFT_STATE, SHIFT_STATE_VERSIONS } from "./shift";
export { OUTPUT_STATE, OUTPUT_STATE_VERSIONS } from "./output";
export { VCA_STATE, VCA_STATE_VERSIONS } from "./vca";
