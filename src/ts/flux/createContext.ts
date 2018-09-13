import { NodeType } from "../enums/NodeType";
import { Module, Node } from "./models";
import { createState } from "./createState";

export interface IContext {
  addModule: (node: NodeType) => string;
}
export interface IComplexModule {
  children: string[];
}

export const createContext = (audioContext = new AudioContext(), state = createState()): IContext => {
  // do the heavy lifting here
  const addModule = (type: NodeType, configuration?: IComplexModule): string => {
    const mod = new Module(createNode(type));
    state.modules.set(mod);
    return mod.hashKey;
  }
  const createNode = (type: NodeType, configuration?: IComplexModule): string => {
    const node = new Node(type);
    return node.hashKey;
  }
  return {
    addModule
  };
}
