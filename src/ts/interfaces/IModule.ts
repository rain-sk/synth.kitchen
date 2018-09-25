import { ModuleType } from "../enums/ModuleType";
import { IDispatch } from ".";

export interface IModule extends IDispatch {
  type: ModuleType;
  index?: number;
}