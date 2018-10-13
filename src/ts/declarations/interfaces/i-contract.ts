import { Contract, IAction, ISynthKitchen } from "..";

export interface IContract {
  type: Contract,
  reduce: (action: IAction<{}>, state: ISynthKitchen) => ISynthKitchen;
}
