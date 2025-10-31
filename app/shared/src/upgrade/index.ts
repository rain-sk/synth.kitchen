export type APP_STATE_VERSIONS = ["0.5.10"];
export const APP_STATE_VERSIONS: APP_STATE_VERSIONS = ["0.5.10"];
export const APP_STATE_VERSION = APP_STATE_VERSIONS[0];

export { moduleNeedsUpgrade, upgradeModule } from "./module";
export {
  connectionsStateNeedsUpgrade,
  upgradeConnectionsState,
} from "./connections-state";
export { patchStateNeedsUpgrade, upgradePatchState } from "./patch-state";
