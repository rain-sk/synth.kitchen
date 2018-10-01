import { IAction, IContract, IOContract, ISynthKitchen } from '../../declarations';

export const IO_CLICK: IContract = {
  type: IOContract.CLICK,
  reduce: (action: IAction, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === IO_CLICK.type) state.clicks.push(`${action.payload}`);
    return state;
  }
}
