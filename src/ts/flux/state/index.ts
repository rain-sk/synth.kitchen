import { BaseState } from 'use-flux'
import { createOscillator } from './module-factories';
import { ModuleProps } from '../../components/module';
import { IoAction, ModuleAction, MouseAction, MidiAction } from '../actions';
import { IoState, initialIoState } from './io';
import { ModuleState, initialModuleState } from './module';
import { MidiState, initialMidiState } from './midi';

export type Action = IoAction | MidiAction | ModuleAction | MouseAction;

export type State = BaseState<Action> & IoState & MidiState & ModuleState;

const moduleMap = new Map<string, ModuleProps>();
const osc = createOscillator();
moduleMap.set(osc.id, osc);

export const initialState: State = {
	...initialIoState,
	...initialMidiState,
	...initialModuleState,
	dispatchQueue: []
};
