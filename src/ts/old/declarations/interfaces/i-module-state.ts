import { IIO } from '.';

export interface IModuleState {
  node?: any;
  inputs?: IIO[];
  outputs?: IIO[];
  mods?: IIO[];
  params?: IIO[];
}