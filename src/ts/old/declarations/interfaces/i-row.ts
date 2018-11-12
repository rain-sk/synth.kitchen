import { IModule } from ".";
import { IDispatch } from ".";

export interface IRow extends IDispatch {
  row: IModule[];
  index: number;
}
