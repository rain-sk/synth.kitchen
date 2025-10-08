import {
  Connector,
  Input,
  ioKey,
  Module,
  Output,
  paramKey,
  Patch,
  PatchState,
} from "../types/patch";
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

const connectorKey = (connector: Connector) =>
  "type" in connector ? ioKey(connector) : paramKey(connector);

const connectionKey = (output: Output, input: Input) => {
  return `${connectorKey(output)}|${connectorKey(input)}`;
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
  };
};
