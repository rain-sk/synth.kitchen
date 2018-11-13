import { IoAction } from './actions';
import { IoState } from './state';
import { Reducer } from '../../types/reducer';
import {
    IoActivate,
    IoClear,
    IoConnect,
    IoDeactivate,
    IoDisconnect,
    IoRegister,
    IoClick,
    IoMouseDown,
    IoMouseUp,
    IoProcessPair
} from './reducers';

export type IoAction = 'IO_CONNECT'
    | 'IO_DISCONNECT'
    | 'IO_REGISTER'
    | 'IO_CLEAR'
    | 'IO_ACTIVATE'
    | 'IO_DEACTIVATE'
    | 'IO_CLICK'
    | 'IO_MOUSE_DOWN'
    | 'IO_MOUSE_UP'
    | 'IO_PROCESS_PAIR';

export const IoReducers = new Map<IoAction, Reducer<IoState>>();

IoReducers.set('IO_ACTIVATE', IoActivate);
IoReducers.set('IO_CLEAR', IoClear);
IoReducers.set('IO_CLICK', IoClick);
IoReducers.set('IO_MOUSE_DOWN', IoMouseDown);
IoReducers.set('IO_MOUSE_UP', IoMouseUp);
IoReducers.set('IO_CONNECT', IoConnect);
IoReducers.set('IO_DEACTIVATE', IoDeactivate);
IoReducers.set('IO_DISCONNECT', IoDisconnect);
IoReducers.set('IO_REGISTER', IoRegister);
IoReducers.set('IO_PROCESS_PAIR', IoProcessPair);