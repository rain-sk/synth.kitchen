import { createFlux } from 'use-flux';

import { initialState } from './state';

import {
	IoActivate,
	IoClear,
	IoConnect,
	IoDeactivate,
	IoDelete,
	IoDisconnect,
	IoProcessPair,
	IoRegister,
	Initialize,
	PlayNote,
	StopNote,
	AddModule,
	AddTrack,
	RemoveModule,
	RemoveTrack,
	MouseClick,
	MouseDown,
	MouseUp
} from './reducers';


export const [reducers, KitchenStore, KitchenProvider] = createFlux(initialState);

reducers.set('IO_ACTIVATE', IoActivate);
reducers.set('IO_CLEAR', IoClear);
reducers.set('IO_CONNECT', IoConnect);
reducers.set('IO_DEACTIVATE', IoDeactivate);
reducers.set('IO_DELETE', IoDelete);
reducers.set('IO_DISCONNECT', IoDisconnect);
reducers.set('IO_PROCESS_PAIR', IoProcessPair);
reducers.set('IO_REGISTER', IoRegister);

//---------------------------------------------

reducers.set('MIDI_INITIALIZE', Initialize);
reducers.set('MIDI_PLAY_NOTE', PlayNote);
reducers.set('MIDI_STOP_NOTE', StopNote);

//---------------------------------------------

reducers.set('MODULE_ADD', AddModule);
reducers.set('MODULE_ADD_TRACK', AddTrack);
reducers.set('MODULE_REMOVE', RemoveModule);
reducers.set('MODULE_REMOVE_TRACK', RemoveTrack);

//---------------------------------------------

reducers.set('MOUSE_CLICK', MouseClick);
reducers.set('MOUSE_DOWN', MouseDown);
reducers.set('MOUSE_UP', MouseUp);

//---------------------------------------------

