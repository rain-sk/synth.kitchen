import { IAction } from "../interfaces/IAction";

export const createDispatcher = (reducers: any[]) => (action: IAction): any => {
  let state = undefined;
  reducers.forEach((reduce: (action: IAction) => any) => {
    state = reduce(action);
  });
  return state;
}