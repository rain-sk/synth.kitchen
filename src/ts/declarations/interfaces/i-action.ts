import { IOContract } from '..';

export interface IAction {
  type: IOContract;
  payload?: any;
}