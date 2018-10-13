import { IAction, IContract, IOContract, ISynthKitchen } from '../../declarations';

export const MODULE_ADD: IContract = {
  type: IOContract.CLICK,
  reduce: (action: IAction<any>, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === MODULE_ADD.type) state.modules[action.payload.row].push(action.payload.newModule);
    return state;
  }
}
