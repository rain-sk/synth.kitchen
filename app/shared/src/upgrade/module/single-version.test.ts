import { describe, expect, it } from "vitest";

import {
  ModuleState,
  ModuleType,
  defaultModuleState,
} from "../../types/patch/module";

import {
  needsUpgrade as compressorNeeds,
  upgrade as compressorUp,
} from "./compressor";
import { needsUpgrade as delayNeeds, upgrade as delayUp } from "./delay";
import { needsUpgrade as gainNeeds, upgrade as gainUp } from "./gain";
import { needsUpgrade as gateNeeds, upgrade as gateUp } from "./gate";
import { needsUpgrade as limiterNeeds, upgrade as limiterUp } from "./limiter";
import {
  needsUpgrade as midiClockNeeds,
  upgrade as midiClockUp,
} from "./midi-clock";
import {
  needsUpgrade as midiTriggerNeeds,
  upgrade as midiTriggerUp,
} from "./midi-trigger";
import { needsUpgrade as outputNeeds, upgrade as outputUp } from "./output";
import { needsUpgrade as panNeeds, upgrade as panUp } from "./pan";
import { needsUpgrade as scopeNeeds, upgrade as scopeUp } from "./scope";
import { needsUpgrade as shiftNeeds, upgrade as shiftUp } from "./shift";

type ModuleVersionInfo<T extends ModuleType = ModuleType> = {
  type: T;
  label: string;
  current: ModuleState[T]["version"];
  upgrade: (state: any) => ModuleState[T];
  needsUpgrade: (state: any) => boolean;
  guarded: boolean;
};

const singleVersion: ModuleVersionInfo[] = [
  {
    type: ModuleType.COMPRESSOR,
    label: "COMPRESSOR",
    current: "0.5.0",
    upgrade: compressorUp,
    needsUpgrade: compressorNeeds,
    guarded: true,
  },
  {
    type: ModuleType.DELAY,
    label: "DELAY",
    current: "0.5.0",
    upgrade: delayUp,
    needsUpgrade: delayNeeds,
    guarded: true,
  },
  {
    type: ModuleType.GAIN,
    label: "GAIN",
    current: "0.5.0",
    upgrade: gainUp,
    needsUpgrade: gainNeeds,
    guarded: true,
  },
  {
    type: ModuleType.GATE,
    label: "GATE",
    current: "0.5.0",
    upgrade: gateUp,
    needsUpgrade: gateNeeds,
    guarded: true,
  },
  {
    type: ModuleType.LIMITER,
    label: "LIMITER",
    current: "0.5.0",
    upgrade: limiterUp,
    needsUpgrade: limiterNeeds,
    guarded: false,
  },
  {
    type: ModuleType.MIDI_CLOCK,
    label: "MIDI_CLOCK",
    current: "0.5.0",
    upgrade: midiClockUp,
    needsUpgrade: midiClockNeeds,
    guarded: false,
  },
  {
    type: ModuleType.MIDI_TRIGGER,
    label: "MIDI_TRIGGER",
    current: "0.5.0",
    upgrade: midiTriggerUp,
    needsUpgrade: midiTriggerNeeds,
    guarded: true,
  },
  {
    type: ModuleType.OUTPUT,
    label: "OUTPUT",
    current: "0.5.0",
    upgrade: outputUp,
    needsUpgrade: outputNeeds,
    guarded: true,
  },
  {
    type: ModuleType.PAN,
    label: "PAN",
    current: "0.5.0",
    upgrade: panUp,
    needsUpgrade: panNeeds,
    guarded: true,
  },
  {
    type: ModuleType.SCOPE,
    label: "SCOPE",
    current: "0.5.7",
    upgrade: scopeUp,
    needsUpgrade: scopeNeeds,
    guarded: false,
  },
  {
    type: ModuleType.SHIFT,
    label: "SHIFT",
    current: "0.5.0",
    upgrade: shiftUp,
    needsUpgrade: shiftNeeds,
    guarded: true,
  },
];

const legacy = (type: ModuleType) => {
  const { version, ...rest } = defaultModuleState(type) as any;
  return rest;
};

describe.each(singleVersion)(
  "$label single-version upgrade",
  ({ type, label, current, upgrade, needsUpgrade, guarded }) => {
    it("says the current version needs no upgrade", () => {
      expect(needsUpgrade({ version: current })).toBe(false);
    });

    it("calls any other version stale", () => {
      expect(needsUpgrade({ version: "0.0.1" })).toBe(true);
      expect(needsUpgrade(legacy(type))).toBe(true);
    });

    it("stamps a version-less state to the current version and keeps its params", () => {
      expect(upgrade(legacy(type))).toEqual({
        version: current,
        ...legacy(type),
      });
    });

    it("returns the current version unchanged", () => {
      const state = { version: current, ...legacy(type) };
      expect(upgrade(state)).toEqual(state);
    });

    it("throws naming the module when there is no migration for that version", () => {
      expect(() => upgrade({ version: "9.9.9" })).toThrow(new RegExp(label));
    });

    it("refuses a version-less state missing a declared key", () => {
      const partial = { ...legacy(type) };
      delete partial[Object.keys(partial)[0]];
      if (guarded) {
        expect(() => upgrade(partial)).toThrow(new RegExp(label));
      } else {
        expect(upgrade(partial)).toEqual({ version: current, ...partial });
      }
    });

    it("persists keys the current state type does not declare", () => {
      expect(upgrade({ ...legacy(type), stray: 1 })).toEqual({
        version: current,
        ...legacy(type),
        stray: 1,
      });
    });
  },
);

describe("limiter stamp", () => {
  it("does not gain midi-trigger keys when stamped empty", () => {
    const state = limiterUp({} as any);
    expect(state).toEqual({ version: "0.5.0" });
    expect(state).not.toHaveProperty("input");
    expect(state).not.toHaveProperty("note");
  });
});
