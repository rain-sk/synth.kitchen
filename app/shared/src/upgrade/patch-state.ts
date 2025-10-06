import { Module, Patch, PatchState } from "../types/patch";
import { Connection, connectionKey } from "../types/patch/connection";
import { moduleNeedsUpgrade, upgradeModule } from "./module";

export const patchStateNeedsUpgrade = (state: PatchState): boolean => {
  const statesNeedUpgrade = Object.keys(state.modules).some((key) => {
    const module = state.modules[key];
    return moduleNeedsUpgrade(module.type, module.state);
  });

  if (statesNeedUpgrade) {
    return true;
  }

  const connectionsNeedUpgrade = Object.keys(state.connections).some((key) => {
    let [_, input] = state.connections[key];
    return "name" in input && input.name === "gate";
  });

  return connectionsNeedUpgrade;
};

export const upgradePatchState = (state: PatchState): PatchState => {
  const modules: Record<string, Module> = {};
  Object.entries(state.modules).forEach(([id, module]) => {
    modules[id] = {
      ...module,
      state: upgradeModule(module.type, module.state),
    };
  });

  Object.entries(state.connections).forEach(([key, [output, input]]) => {
    if ("name" in input && input.name === "gate") {
      input = {
        ...input,
        name: "hold",
      };
      state = {
        ...state,
      };
      delete state.connections[key];
      const newKey = connectionKey(output, input);
      state.connections[newKey] = [output, input];
    }
  });
  return {
    ...state,
    modules,
  };
};
