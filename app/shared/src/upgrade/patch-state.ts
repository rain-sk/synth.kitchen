import {
  Module,
  PATCH_STATE,
  PATCH_STATE_VERSIONS,
  PatchState,
} from "../types/patch";
import {
  connectionsStateNeedsUpgrade,
  upgradeConnectionsState,
} from "./connections-state";
import { moduleNeedsUpgrade, upgradeModule } from "./module";

export const patchStateNeedsUpgrade = (
  state?: PATCH_STATE[keyof PATCH_STATE]
): boolean => {
  if (!state) {
    return false;
  }

  const stateVersionMismatch = state.version !== PATCH_STATE_VERSIONS[0];

  return (
    stateVersionMismatch ||
    connectionsStateNeedsUpgrade(state.connections) ||
    Object.keys(state.modules).some((key) => {
      const module = state.modules[key];
      return moduleNeedsUpgrade(module.type, module.state);
    })
  );
};

export const upgradePatchState = (
  state: PATCH_STATE[keyof PATCH_STATE]
): PatchState => {
  if (state.version !== PATCH_STATE_VERSIONS[0]) {
    switch (state.version) {
      case undefined:
      case "0.5.6":
      case "0.5.7": {
        const connections = upgradeConnectionsState(state);
        const modules: Record<string, Module> = {};
        Object.entries(state.modules).forEach(([id, module]) => {
          modules[id] = {
            ...module,
            state: upgradeModule(module.type, module.state),
          };
        });
        const newState: PatchState = {
          ...state,
          version: "0.5.8",
          connections,
        };
        state = newState;
      }

      default:
        break;
    }
    return state;
  } else {
    const connections = upgradeConnectionsState(state);
    const modules: Record<string, Module> = {};
    Object.entries(state.modules).forEach(([id, module]) => {
      modules[id] = {
        ...module,
        state: upgradeModule(module.type, module.state),
      };
    });

    return {
      ...state,
      connections,
      modules,
    };
  }
};
