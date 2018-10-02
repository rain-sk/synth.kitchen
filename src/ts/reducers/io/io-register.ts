import { IAction, IOContract, ISynthKitchen } from '../../declarations';

export const IO_REGISTER = {
  type: IOContract.REGISTER,
  reduce: (action: IAction, state: ISynthKitchen): ISynthKitchen => {
    if (action.type = IO_REGISTER.type) state.ioList.set(`${action.payload.id}`, action.payload.element);
    return state;
  }
}
