import { Module, Patch, PatchState } from "../types/patch";
import { moduleNeedsUpgrade, upgradeModule } from "./module";

export const patchStateNeedsUpgrade = (state: PatchState): boolean => {
  return (
    true ||
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

  Object.entries(state.connections).forEach(([key, [output, input]]) => {
    if ("name" in input && input.name === "hold") {
      input = {
        ...input,
        name: "gate",
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
