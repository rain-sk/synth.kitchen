import { describe, it, expect } from "vitest";
import { PatchState, PATCH_STATE_VERSIONS, ModuleType } from "../types/patch";
import { patchStateNeedsUpgrade, upgradePatchState } from "./patch-state";

describe("patch-state", () => {
  describe("patchStateNeedsUpgrade", () => {
    it("returns false for undefined state", () => {
      expect(patchStateNeedsUpgrade(undefined)).toBe(false);
    });

    it("returns true when version mismatches", () => {
      const mockState = { version: "0.5.7" } as any as PatchState;
      expect(patchStateNeedsUpgrade(mockState)).toBe(true);
    });

    it("returns true when connections need upgrade", () => {
      const mockState = {
        version: "0.5.8",
        name: "test",
        connections: { version: "0.5.6", state: {} },
        modules: {},
      } as any as PatchState;
      expect(patchStateNeedsUpgrade(mockState)).toBe(true);
    });

    it("returns true when any module needs upgrade", () => {
      const mockState = {
        version: "0.5.8",
        name: "test",
        connections: { version: "0.5.7", state: {} },
        modules: {
          mod1: { type: ModuleType.OSCILLATOR, state: { version: "0.5.0" } },
        },
      } as any as PatchState;
      expect(patchStateNeedsUpgrade(mockState)).toBe(true);
    });

    it("returns false when everything is up to date", () => {
      const mockState = {
        version: "0.5.8",
        name: "test",
        connections: { version: "0.5.7", state: {} },
        modules: {
          mod1: { type: ModuleType.OSCILLATOR, state: { version: "0.5.12" } },
        },
      } as any as PatchState;
      expect(patchStateNeedsUpgrade(mockState)).toBe(false);
    });
  });

  describe("upgradePatchState", () => {
    // @ts-ignore
    it("upgrades from 0.5.6 to 0.5.8", () => {
      const mockState = {
        version: "0.5.6",
        name: "test",
        connections: {
          version: "0.5.6",
          state: {},
        },
        modules: {},
      } as any;

      const result = upgradePatchState(mockState);

      expect(result.version).toBe("0.5.8");
    });

    // @ts-ignore
    it("upgrades from 0.5.7 to 0.5.8", () => {
      const mockState = {
        version: "0.5.7",
        name: "test",
        connections: { version: "0.5.7", state: {} },
        modules: {},
      } as any;

      const result = upgradePatchState(mockState);

      expect(result.version).toBe("0.5.8");
    });

    it("upgrades module states when at latest version", () => {
      const mockState = {
        version: "0.5.8",
        name: "test",
        connections: { version: "0.5.7", state: {} },
        modules: {
          mod1: { type: ModuleType.OSCILLATOR, state: { version: "0.5.12" } },
        },
      } as any as PatchState;

      const result = upgradePatchState(mockState);

      expect(result.modules.mod1.state.version).toBe("0.5.12");
    });

    // @ts-ignore
    it("handles legacy state without version", () => {
      const mockState = {
        name: "test",
        connections: {
          version: "0.5.6",
          state: {},
        },
        modules: {},
      } as any;

      const result = upgradePatchState(mockState);

      expect(result.version).toBe("0.5.8");
    });
  });
});
