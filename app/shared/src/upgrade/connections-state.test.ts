import { describe, it, expect } from "vitest";
import { CONNECTIONS_STATE_VERSIONS } from "../types/patch/connection";
import {
  connectionsStateNeedsUpgrade,
  upgradeConnectionsState,
} from "./connections-state";

describe("connections-state", () => {
  describe("connectionsStateNeedsUpgrade", () => {
    it("returns false for latest version", () => {
      const state = { version: "0.5.7", state: {} } as any;
      expect(connectionsStateNeedsUpgrade(state)).toBe(false);
    });

    it("returns true for older version 0.5.6", () => {
      const state = { version: "0.5.6", state: {} } as any;
      expect(connectionsStateNeedsUpgrade(state)).toBe(true);
    });

    it("returns true for older version 0.5.5", () => {
      const state = { version: "0.5.5" } as any;
      expect(connectionsStateNeedsUpgrade(state)).toBe(true);
    });

    it("returns true for undefined version", () => {
      const state = { state: {} } as any;
      expect(connectionsStateNeedsUpgrade(state)).toBe(true);
    });
  });

  describe("upgradeConnectionsState", () => {
    it("upgrades from 0.5.6 to latest", () => {
      const mockPatchState = {
        connections: {
          version: "0.5.6",
          state: {},
        },
        modules: {},
      } as any;

      const result = upgradeConnectionsState(mockPatchState);

      expect(result.version).toBe("0.5.7");
    });

    it("throws for unsupported version", () => {
      const mockPatchState = {
        connections: { version: "0.1.0" } as any,
      } as any;

      expect(() => upgradeConnectionsState(mockPatchState)).toThrow(
        "Unable to upgrade given state object",
      );
    });
  });
});
