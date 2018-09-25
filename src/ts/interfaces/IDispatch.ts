import { IAction } from "./IAction";

export interface IDispatch {
  dispatch: (action: IAction) => void;
}
