import { ModuleType } from "../enums/ModuleType";
import { Module, Node } from "./models";
import { getState } from "./getState";

export interface IContext {
  addModule: (node: ModuleType) => string;
}
export interface IComplexModule {
  children: string[];
}

export const createContext = (audioContext = new AudioContext(), state = getState()): IContext => {
  // do the heavy lifting here
  const addModule = (type: ModuleType, configuration?: IComplexModule): string => {
    const mod = new Module(createNode(type));
    state.modules.set(mod);
    return mod.hashKey;
  }
  const createNode = (type: ModuleType, configuration?: IComplexModule): string => {
    const node = new Node(type);
    return node.hashKey;
  }
  return {
    addModule
  };
}
