import { ModuleState, ModuleType } from "synth.kitchen-shared";
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

export function upgrade<T extends ModuleType>(
  type: T,
  state: ModuleState[T] | Exclude<ModuleState[T], "version">
): ModuleState[keyof ModuleState] {
  if (!state) {
    return state;
  }

  switch (type) {
    case "CLOCK": {
      if (state && clockNeedsUpgrade(state as ModuleState["CLOCK"])) {
        return upgradeClock(state as ModuleState["CLOCK"]);
      } else {
        return state;
      }
    }
    case "COMPRESSOR": {
      if (state && compressorNeedsUpgrade(state as ModuleState["COMPRESSOR"])) {
        return upgradeCompressor(state as ModuleState["COMPRESSOR"]);
      } else {
        return state;
      }
    }
    case "DELAY": {
      if (state && delayNeedsUpgrade(state as ModuleState["DELAY"])) {
        return upgradeDelay(state as ModuleState["DELAY"]);
      } else {
        return state;
      }
    }
    case "ENVELOPE": {
      if (state && envelopeNeedsUpgrade(state as ModuleState["ENVELOPE"])) {
        return upgradeEnvelope(state as ModuleState["ENVELOPE"]);
      } else {
        return state;
      }
    }
    case "FILTER": {
      if (state && filterNeedsUpgrade(state as ModuleState["FILTER"])) {
        return upgradeFilter(state as ModuleState["FILTER"]);
      } else {
        return state;
      }
    }
    case "GAIN": {
      if (state && gainNeedsUpgrade(state as ModuleState["GAIN"])) {
        return upgradeGain(state as ModuleState["GAIN"]);
      } else {
        return state;
      }
    }
    case "GATE": {
      if (state && gateNeedsUpgrade(state as ModuleState["GATE"])) {
        return upgradeGate(state as ModuleState["GATE"]);
      } else {
        return state;
      }
    }
    case "LIMITER": {
      if (state && limiterNeedsUpgrade(state as ModuleState["LIMITER"])) {
        return upgradeLimiter(state as ModuleState["LIMITER"]);
      } else {
        return state;
      }
    }
    case "MIDI_CC": {
      if (state && midiCcNeedsUpgrade(state as ModuleState["MIDI_CC"])) {
        return upgradeMidiCc(state as ModuleState["MIDI_CC"]);
      } else {
        return state;
      }
    }
    case "MIDI_CLOCK": {
      if (state && midiClockNeedsUpgrade(state as ModuleState["MIDI_CLOCK"])) {
        return upgradeMidiClock(state as ModuleState["MIDI_CLOCK"]);
      } else {
        return state;
      }
    }
    case "MIDI_TRIGGER": {
      if (
        state &&
        midiTriggerNeedsUpgrade(state as ModuleState["MIDI_TRIGGER"])
      ) {
        return upgradeMidiTrigger(state as ModuleState["MIDI_TRIGGER"]);
      } else {
        return state;
      }
    }
    case "NOISE": {
      if (state && noiseNeedsUpgrade(state as ModuleState["NOISE"])) {
        return upgradeNoise(state as ModuleState["NOISE"]);
      } else {
        return state;
      }
    }
    case "OSCILLATOR": {
      if (state && oscillatorNeedsUpgrade(state as ModuleState["OSCILLATOR"])) {
        return upgradeOscillator(state as ModuleState["OSCILLATOR"]);
      } else {
        return state;
      }
    }
    case "OUTPUT": {
      if (state && outputNeedsUpgrade(state as ModuleState["OUTPUT"])) {
        return upgradeOutput(state as ModuleState["OUTPUT"]);
      } else {
        return state;
      }
    }
    case "PAN": {
      if (state && panNeedsUpgrade(state as ModuleState["PAN"])) {
        return upgradePan(state as ModuleState["PAN"]);
      } else {
        return state;
      }
    }
    case "SEQUENCER": {
      if (state && sequencerNeedsUpgrade(state as ModuleState["SEQUENCER"])) {
        return upgradeSequencer(state as ModuleState["SEQUENCER"]);
      } else {
        return state;
      }
    }
    case "SHIFT": {
      if (state && shiftNeedsUpgrade(state as ModuleState["SHIFT"])) {
        return upgradeShift(state as ModuleState["SHIFT"]);
      } else {
        return state;
      }
    }
    case "VCA": {
      if (state && vcaNeedsUpgrade(state as ModuleState["VCA"])) {
        return upgradeVCA(state as ModuleState["VCA"]);
      } else {
        return state;
      }
    }
  }

  throw new Error("Failed to handle module for upgrade");
}
