import { IAction } from ".";

export interface IDispatch {
  dispatch: (action: IAction) => void;
}
