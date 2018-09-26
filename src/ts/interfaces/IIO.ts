import { IOType } from '../enums';

export type Range = [
  number,
  number,
  (controlSetting: number) => number,
  (nodeValue: number) => number
];

export interface IIO {
  name: string;
  types: IOType[];
  target: any;
  accessor?: string;
  range?: Range;
  options?: any;
}