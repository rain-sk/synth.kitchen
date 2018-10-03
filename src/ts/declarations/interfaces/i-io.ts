import { IOType } from '..';
import { IDispatch } from '.';

export interface IIO extends IDispatch {
  name: string;
  types: IOType[];
  target?: any;
  accessor?: string;
  getter?: () => AudioParam;
  setter?: (to: number) => void;
  range?: Range;
  options?: string[] | [string, any][];
  activeId?: string;
}