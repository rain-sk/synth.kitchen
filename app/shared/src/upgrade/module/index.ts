import { Module, ModuleState, ModuleType } from "../../types";
import {
  needsUpgrade as clockNeedsUpgrade,
  upgrade as upgradeClock,
} from "./clock";
import {
  needsUpgrade as compressorNeedsUpgrade,
  upgrade as upgradeCompressor,
} from "./compressor";
import {
  needsUpgrade as delayNeedsUpgrade,
  upgrade as upgradeDelay,
} from "./delay";
import {
  needsUpgrade as envelopeNeedsUpgrade,
  upgrade as upgradeEnvelope,
} from "./envelope";
import {
  needsUpgrade as filterNeedsUpgrade,
  upgrade as upgradeFilter,
} from "./filter";
import {
  needsUpgrade as gainNeedsUpgrade,
  upgrade as upgradeGain,
} from "./gain";
import {
  needsUpgrade as gateNeedsUpgrade,
  upgrade as upgradeGate,
} from "./gate";
import {
  needsUpgrade as limiterNeedsUpgrade,
  upgrade as upgradeLimiter,
} from "./limiter";
import {
  needsUpgrade as midiCcNeedsUpgrade,
  upgrade as upgradeMidiCc,
} from "./midi-cc";
import {
  needsUpgrade as midiClockNeedsUpgrade,
  upgrade as upgradeMidiClock,
} from "./midi-clock";
import {
  needsUpgrade as midiTriggerNeedsUpgrade,
  upgrade as upgradeMidiTrigger,
} from "./midi-trigger";
import {
  needsUpgrade as noiseNeedsUpgrade,
  upgrade as upgradeNoise,
} from "./noise";
import {
  needsUpgrade as oscillatorNeedsUpgrade,
  upgrade as upgradeOscillator,
} from "./oscillator";
import {
  needsUpgrade as outputNeedsUpgrade,
  upgrade as upgradeOutput,
} from "./output";
import { needsUpgrade as panNeedsUpgrade, upgrade as upgradePan } from "./pan";
import {
  needsUpgrade as sequencerNeedsUpgrade,
  upgrade as upgradeSequencer,
} from "./sequencer";
import {
  needsUpgrade as shiftNeedsUpgrade,
  upgrade as upgradeShift,
} from "./shift";
import { needsUpgrade as vcaNeedsUpgrade, upgrade as upgradeVCA } from "./vca";

type ModuleUpgradeMap = {
  [T in ModuleType]: {
    needsUpgrade: (
      state: ModuleState[T] | Exclude<ModuleState[T], "version">
    ) => boolean;
    upgrade: (
      state: ModuleState[T] | Exclude<ModuleState[T], "version">
    ) => ModuleState[T];
  };
};

const upgradeMap: ModuleUpgradeMap = {
  CLOCK: { needsUpgrade: clockNeedsUpgrade, upgrade: upgradeClock },
  COMPRESSOR: {
    needsUpgrade: compressorNeedsUpgrade,
    upgrade: upgradeCompressor,
  },
  DELAY: {
    needsUpgrade: delayNeedsUpgrade,
    upgrade: upgradeDelay,
  },
  ENVELOPE: {
    needsUpgrade: envelopeNeedsUpgrade,
    upgrade: upgradeEnvelope,
  },
  FILTER: {
    needsUpgrade: filterNeedsUpgrade,
    upgrade: upgradeFilter,
  },
  GAIN: {
    needsUpgrade: gainNeedsUpgrade,
    upgrade: upgradeGain,
  },
  GATE: {
    needsUpgrade: gateNeedsUpgrade,
    upgrade: upgradeGate,
  },
  LIMITER: {
    needsUpgrade: limiterNeedsUpgrade,
    upgrade: upgradeLimiter,
  },
  MIDI_CC: {
    needsUpgrade: midiCcNeedsUpgrade,
    upgrade: upgradeMidiCc,
  },
  MIDI_CLOCK: {
    needsUpgrade: midiClockNeedsUpgrade,
    upgrade: upgradeMidiClock,
  },
  MIDI_TRIGGER: {
    needsUpgrade: midiTriggerNeedsUpgrade,
    upgrade: upgradeMidiTrigger,
  },
  NOISE: {
    needsUpgrade: noiseNeedsUpgrade,
    upgrade: upgradeNoise,
  },
  OSCILLATOR: {
    needsUpgrade: oscillatorNeedsUpgrade,
    upgrade: upgradeOscillator,
  },
  OUTPUT: {
    needsUpgrade: outputNeedsUpgrade,
    upgrade: upgradeOutput,
  },
  PAN: {
    needsUpgrade: panNeedsUpgrade,
    upgrade: upgradePan,
  },
  SEQUENCER: {
    needsUpgrade: sequencerNeedsUpgrade,
    upgrade: upgradeSequencer,
  },
  SHIFT: {
    needsUpgrade: shiftNeedsUpgrade,
    upgrade: upgradeShift,
  },
  VCA: {
    needsUpgrade: vcaNeedsUpgrade,
    upgrade: upgradeVCA,
  },
};

export function moduleNeedsUpgrade<T extends ModuleType>(
  type: T,
  state: ModuleState[T]
) {
  return state && upgradeMap[type].needsUpgrade(state);
}

export function upgradeModule<T extends ModuleType>(
  type: T,
  state: ModuleState[T]
) {
  if (!state || !upgradeMap[type].needsUpgrade(state)) {
    return state;
  }

  return upgradeMap[type].upgrade(state);
}
