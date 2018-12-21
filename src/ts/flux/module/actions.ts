import { ModuleState } from './state';
import { Reducer } from 'use-flux';
import {
    AddModule,
    AddTrack
} from './reducers';

export type ModuleAction =
    //| 'MODULE_MOVE'
    | 'ADD_MODULE'
    | 'ADD_TRACK';

export const ModuleReducers = new Map<ModuleAction, Reducer<ModuleState>>();

//ModuleReducers.set('MODULE_MOVE', ModuleMove);
ModuleReducers.set('ADD_MODULE', AddModule);
ModuleReducers.set('ADD_TRACK', AddTrack);
