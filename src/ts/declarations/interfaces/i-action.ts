import { IOContract } from '..';

export interface IAction<T> {
  type: IOContract;
  payload?: T;
}