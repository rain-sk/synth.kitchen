import { IAction, IOContract } from '../../declarations';

export const REGISTER = {
  type: IOContract.REGISTER,
  action: (action: IAction) => (state: any): any => {
    if (action.type = REGISTER.type) state.ioMap.add(`${action.payload}`);
    return state;
  }
}
