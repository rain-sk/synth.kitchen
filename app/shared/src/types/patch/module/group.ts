import { Connection, ModuleState, ModuleType } from "../..";

export type MODULE_GROUP_STATE_VERSIONS = ["0.5.13"];
export const MODULE_GROUP_STATE_VERSIONS: MODULE_GROUP_STATE_VERSIONS = [
  "0.5.13",
];

export type ModuleGroup = MODULE_GROUP_STATE;

export type MODULE_GROUP_STATE = {
  ["0.5.13"]: {
    version: "0.5.13";
    name: string;
    description?: string;
    modules: Record<string, SubModule>;
    connections: Record<string, Connection>;
    exposedParameters: Record<string, ExposedParameter>;
  };
};

export type SubModule<Type extends ModuleType = ModuleType> = {
  id: string;
  type: Type;
  position: [number, number];
  state: ModuleState[Type];
};

export type ExposedParameter = {
  id: string;
  path: string[];
  label: string;
  unit?: string;
  min?: number;
  max?: number;
  defaultValue: unknown;
};
