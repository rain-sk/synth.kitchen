import { IBaseEntity, IONode, Module, Node } from "./models";

export interface Action {
  type: string;
  payload?: any;
}

const createGetSet = <T>(map: Map<string, T>) => {
  return {
    get: (key: string): T | undefined => {
      return map.get(key);
    },
    set: (value: T & IBaseEntity) => {
      map.set(value.hashKey, value);
    }
  }
}

const createReducer = (actionType: string, state: any, effect: (state: any, action: Action) => any) => (action: Action) => {
  if (actionType === action.type) {
    effect(state, action);
  }
}

const registerReducer = (actionType: string, state: any, effect: (state: any, action: Action) => any) => {
  reducers.push(createReducer(actionType, state, effect));
}

const dispatch = (action: Action): any => {
  let state = undefined;
  reducers.forEach((reduce: (action: Action) => any) => {
    state = reduce(action);
  });
  return state;
}

const reducers: any[] = [];
const modules = createGetSet(new Map<string, Module>());
const nodes = createGetSet(new Map<string, Node>());
const ioNodes = createGetSet(new Map<string, IONode>());
const connections = createGetSet(new Map<string, any>());

export const createState = () => {
  return {
    modules,
    nodes,
    ioNodes,
    connections,
    registerReducer,
    dispatch
  }
}