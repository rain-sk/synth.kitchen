import { Reducer } from 'use-flux';

import { State, Action } from '../state';

import {
	IoActivate,
	IoClear,
	IoConnect,
	IoDeactivate,
	IoDelete,
	IoDisconnect,
	IoProcessPair,
	IoRegister
} from './io';

import {
	Initialize,
	PlayNote,
	StopNote
} from './midi';

import {
	AddModule,
	AddTrack,
	RemoveModule,
	RemoveTrack
} from './module';

import {
	MouseClick,
	MouseDown,
	MouseUp
} from './mouse';

export const Reducers = new Map<Action, Reducer<State>>();

//---------------------------------------------

Reducers.set('IO_ACTIVATE', IoActivate);
Reducers.set('IO_CLEAR', IoClear);
Reducers.set('IO_CONNECT', IoConnect);
Reducers.set('IO_DEACTIVATE', IoDeactivate);
Reducers.set('IO_DELETE', IoDelete);
Reducers.set('IO_DISCONNECT', IoDisconnect);
Reducers.set('IO_PROCESS_PAIR', IoProcessPair);
Reducers.set('IO_REGISTER', IoRegister);

//---------------------------------------------

Reducers.set('MIDI_INITIALIZE', Initialize);
Reducers.set('MIDI_PLAY_NOTE', PlayNote);
Reducers.set('MIDI_STOP_NOTE', StopNote);

//---------------------------------------------

Reducers.set('MODULE_ADD', AddModule);
Reducers.set('MODULE_ADD_TRACK', AddTrack);
Reducers.set('MODULE_REMOVE', RemoveModule);
Reducers.set('MODULE_REMOVE_TRACK', RemoveTrack);

//---------------------------------------------

Reducers.set('MOUSE_CLICK', MouseClick);
Reducers.set('MOUSE_DOWN', MouseDown);
Reducers.set('MOUSE_UP', MouseUp);

//---------------------------------------------
