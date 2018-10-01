import { IAction, IContract, ISynthKitchen, ModuleContract } from '../../declarations';

export const MODULE_REMOVE: IContract = {
  type: ModuleContract.REMOVE,
  reduce: (action: IAction, state: ISynthKitchen): ISynthKitchen => {
    if (action.type === MODULE_REMOVE.type) state.modules[action.payload.row].splice(action.payload.column);
    return state;
  }
}
