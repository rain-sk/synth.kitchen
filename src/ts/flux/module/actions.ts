import { ModuleState } from './state';
import { Reducer } from 'use-flux';
import {
    //ModuleMove,
    ModuleRegister
} from './reducers';

export type ModuleAction =
    //| 'MODULE_MOVE'
    | 'MODULE_REGISTER';

export const ModuleReducers = new Map<ModuleAction, Reducer<ModuleState>>();

//ModuleReducers.set('MODULE_MOVE', ModuleMove);
ModuleReducers.set('MODULE_REGISTER', ModuleRegister);
