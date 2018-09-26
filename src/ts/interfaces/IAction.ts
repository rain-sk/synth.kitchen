import { IOContract } from '../enums';

export interface IAction {
  type: IOContract;
  payload?: any;
}