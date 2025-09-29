import { Module, ModulePosition } from "./module";
import { UserInfo } from "../user";
import { Connection } from "./connection";

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
  patch: PatchInfo;
  ancestor: SavedPatchState;
  descendants: SavedPatchState[];
  state: PatchState;
};

export type PatchState = {
  name: string;
  modules: Record<string, Module>;
  modulePositions: Record<string, ModulePosition>;
  connections: Record<string, Connection>;
};

export type Patch = PatchInfo & {
  state: SavedPatchState;
};

export {
  Connection,
  ConnectionInfo,
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
