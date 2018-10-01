import { IOType } from '..';
import { IDispatch } from '.';

export type Range = [
  number,
  number,
  (controlSetting: number) => number,
  (nodeValue: number) => number
];

export interface IIO extends IDispatch {
  name: string;
  types: IOType[];
  target: any;
  accessor?: string;
  range?: Range;
  options?: string[] | [string, any][];
}