import { IAction } from "../interfaces/IAction";

export const createReducer = (actionType: string, state: any, effect: (state: any, action: IAction) => any) => (action: IAction) => {
  if (actionType === action.type) {
    effect(state, action);
  }
}

export const compileReducers = (reducers: any[]) => (actionType: string, state: any, effect: (state: any, action: IAction) => any) => {
  reducers.push(createReducer(actionType, state, effect));
}
