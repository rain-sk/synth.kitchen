import { Contract } from '..';

export interface IAction<T> {
  type: Contract;
  payload?: T;
}