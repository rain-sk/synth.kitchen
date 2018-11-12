import { IAction, IOContract, ISynthKitchen, IIONode } from '../../declarations';

export const IO_CONNECT = {
  type: IOContract.CONNECT,
  reduce: (action: IAction<IIONode>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type == IO_CONNECT.type && !!action.payload) {
      if (action.payload.id === state.ioContext[1]) {
        state.ioContext[0] = true;
      }
    }
    return state;
  }
}
