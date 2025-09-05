import { Module, Patch } from "../types/patch";
import { moduleNeedsUpgrade, upgradeModule } from "./module";

export const patchNeedsUpgrade = (patch: Patch) => {
  // think about: does synth.kitchen need versioning
  // outside of module versions? probably...
  // like if a parameter goes away, how to upgrade
  // that parameter's connections?

  return Object.keys(patch.state.modules).some((key) => {
    const module = patch.state.modules[key];
    return moduleNeedsUpgrade(module);
  });
};

export const upgradePatch = (patch: Patch): Patch => {
  const modules: Record<string, Module> = {};
  Object.entries(patch.state.modules).forEach(([key, module]) => {
    modules[key] = upgradeModule(module);
  });
  return {
    ...patch,
    state: {
      ...patch.state,
      modules,
    },
  };
};
