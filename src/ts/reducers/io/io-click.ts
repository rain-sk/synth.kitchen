import { IAction, IContract, IOContract, ISynthKitchen, IIOClickPayload } from '../../declarations';

export const IO_CLICK: IContract = {
  type: IOContract.CLICK,
  reduce: (action: IAction<IIOClickPayload>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === IO_CLICK.type) {
      if (state.ioContext[0]) { // if ioContext is active
        // dispatch: connect([state.ioContext[1], action.payload]);
        state.ioContext = [false, undefined, undefined];
      } else if (!!action.payload) {
        if (action.payload.id !== state.ioContext[1]) {
          state.ioContext = [false, action.payload.id, action.payload.type];
        }
        else {
          state.ioContext = [false, undefined, undefined];
        }
      }
    }
    return state;
  }
}
