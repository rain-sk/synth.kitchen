import { IBaseEntity, IONode, Module, Node } from "./models";

const getSet = <T>(map: Map<string, T>) => {
  return {
    get: (key: string): T | undefined => {
      return map.get(key);
    },
    set: (value: T & IBaseEntity) => {
      map.set(value.hashKey, value);
    },
    delete: (key: string) => {
      map.delete(key);
    }
  }
}

const modules = getSet(new Map<string, Module>());
const nodes = getSet(new Map<string, Node>());
const ioNodes = getSet(new Map<string, IONode>());
const connections = getSet(new Map<string, any>());

export const getState = () => {
  return {
    modules,
    nodes,
    ioNodes,
    connections,
  }
}