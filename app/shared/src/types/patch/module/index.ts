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
  [ModuleType.SEQUENCER]: SEQUENCER_STATE[SEQUENCER_STATE_VERSIONS[0]];
  [ModuleType.SHIFT]: SHIFT_STATE[SHIFT_STATE_VERSIONS[0]];
  [ModuleType.OUTPUT]: OUTPUT_STATE[OUTPUT_STATE_VERSIONS[0]];
  [ModuleType.VCA]: VCA_STATE[VCA_STATE_VERSIONS[0]];
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
export { SEQUENCER_STATE, SEQUENCER_STATE_VERSIONS } from "./sequencer";
export { SHIFT_STATE, SHIFT_STATE_VERSIONS } from "./shift";
export { OUTPUT_STATE, OUTPUT_STATE_VERSIONS } from "./output";
export { VCA_STATE, VCA_STATE_VERSIONS } from "./vca";
