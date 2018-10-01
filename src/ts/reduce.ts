import { IO_CLICK } from './reducers/io/io-click';
import { IO_REGISTER } from './reducers/io/io-register';
import { ISynthKitchen } from './declarations';

const reducers = [
  IO_CLICK,
  IO_REGISTER
];

export const reduce = (action: any, store: ISynthKitchen) => {
  reducers.forEach(reducer => {
    if (action.type === reducer.type) store = reducer.reduce(action, store);
  });
  return store;
}