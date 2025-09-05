import { Module, ModulePosition } from "./module";
import { UserInfo } from "../user";
import { Connection } from "./connection";

export type PatchQuery =
  | {
      id: string;
      slug?: never;
      creatorId?: never;
    }
  | { id?: never; slug: string; creatorId?: never }
  | { id?: never; slug?: never; creatorId: string };

export type PatchInfo = {
  id: string;
  name: string;
  slug: string;
  creator: UserInfo;
};

export type PatchState = {
  modules: Record<string, Module>;
  modulePositions: Record<string, ModulePosition>;
  connections: Record<string, Connection>;
};

export type Patch = PatchInfo & {
  state: PatchState;
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
export { ModuleType, Module, ModuleState, ModulePosition } from "./module";
