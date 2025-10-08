import { Module, PatchState } from "../types/patch";
import {
  connectionsStateNeedsUpgrade,
  upgradeConnectionsState,
} from "./connections-state";
import { moduleNeedsUpgrade, upgradeModule } from "./module";

export const patchStateNeedsUpgrade = (state: PatchState): boolean => {
  return (
    connectionsStateNeedsUpgrade(state.connections) ||
    Object.keys(state.modules).some((key) => {
      const module = state.modules[key];
      return moduleNeedsUpgrade(module.type, module.state);
    })
  );
};

export const upgradePatchState = (state: PatchState): PatchState => {
  const modules: Record<string, Module> = {};
  Object.entries(state.modules).forEach(([id, module]) => {
    modules[id] = {
      ...module,
      state: upgradeModule(module.type, module.state),
    };
  });

  return {
    ...state,
    modules,
    connections: upgradeConnectionsState(state.connections),
  };
};
