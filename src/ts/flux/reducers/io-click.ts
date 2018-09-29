import { IAction, IOContract } from '../../declarations';

export const CLICK = {
  type: IOContract.CLICK,
  action: (action: IAction) => (state: any): any => {
    if (action.type === CLICK.type) state.clicks.push(`${action.payload}`);
    return state;
  }
}
