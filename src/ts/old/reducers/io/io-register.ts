import { IAction, IOContract, ISynthKitchen, IIONode } from '../../declarations';

export const IO_REGISTER = {
  type: IOContract.REGISTER,
  reduce: (action: IAction<IIONode>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type == IO_REGISTER.type && !!action.payload) state.ioNodes.set(action.payload.id, [action.payload, []]);
    return state;
  }
}
