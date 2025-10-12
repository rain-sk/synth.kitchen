import { Module, ModulePosition } from "./module";
import { UserInfo } from "../user";
import { Connection, CONNECTIONS_STATE, ConnectionsState } from "./connection";

export type PatchQuery =
  | {
      id: string;
      slug?: never;
      creatorId?: never;
      random?: never;
    }
  | { id?: never; slug: string; creatorId?: never; random?: never }
  | { id?: never; slug?: never; creatorId: string; random?: never }
  | { id?: never; slug?: never; creatorId?: never; random: true };

export type PatchInfo = {
  id: string;
  name: string;
  slug: string;
  creator: UserInfo;
};

export type SavedPatchState = {
  id: string;
  patch?: PatchInfo;
  ancestor?: SavedPatchState;
  descendants?: SavedPatchState[];
  state: PatchState;
};

export type PATCH_STATE_VERSIONS = ["0.5.8", "0.5.7", "0.5.6"];
export const PATCH_STATE_VERSIONS: PATCH_STATE_VERSIONS = [
  "0.5.8",
  "0.5.7",
  "0.5.6",
];

export type PATCH_STATE = {
  ["0.5.8"]: { version: "0.5.8" } & Omit<PATCH_STATE["0.5.7"], "version">;
  ["0.5.7"]: {
    version: "0.5.7";
    name: string;
    modules: Record<string, Module>;
    modulePositions: Record<string, ModulePosition>;
    connections: CONNECTIONS_STATE["0.5.7"];
  };
  ["0.5.6"]: {
    version?: "0.5.6";
    name: string;
    modules: Record<string, Module>;
    modulePositions: Record<string, ModulePosition>;
    connections: CONNECTIONS_STATE["0.5.5"] | CONNECTIONS_STATE["0.5.6"];
  };
};

export type PatchState = PATCH_STATE[PATCH_STATE_VERSIONS[0]];

export type Patch = PatchInfo & {
  state: SavedPatchState;
};

export {
  Connection,
  ConnectionInfo,
  ConnectionsState,
  CONNECTIONS_STATE_VERSIONS,
  Connector,
  Input,
  Io,
  ioKey,
  IoType,
  Output,
  Parameter,
  paramKey,
} from "./connection";
export {
  ModuleType,
  Module,
  ModuleState,
  defaultModuleState,
  ModulePosition,
} from "./module";
