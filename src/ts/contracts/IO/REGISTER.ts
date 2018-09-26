import { IOContract } from '../../enums';
import { IAction } from '../../interfaces';

export const REGISTER = {
  type: IOContract.REGISTER_IO,
  action: (action: IAction) => (state: any): any => {
    if (action.type = REGISTER.type) state.ioNodes.push(`${action.payload}`);
    return state;
  }
}
