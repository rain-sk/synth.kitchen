import { ModuleType } from "..";
import { IDispatch } from ".";

export interface IModule extends IDispatch {
  type: ModuleType;
  index?: number;
}