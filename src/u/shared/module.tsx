import * as React from 'react';

import { modules } from '../unique/module-map';
import { Gain } from './gain';
import { MidiDevice } from './midi-device';
import { Oscillator } from './oscillator';
import { MidiOscillator } from './midi-oscillator';

export type ModuleType = 'GLOBAL_CONTEXT' | 'GAIN' | 'MIDI_DEVICE' | 'OSCILLATOR' | 'MIDI_OSCILLATOR';

export type ConnectorType = 'CV_IN' | 'SIGNAL_IN' | 'SIGNAL_OUT' | 'MIDI_IN' | 'MIDI_OUT';

export interface IModuleProps {
	moduleKey: string;
	removeModule: (moduleKey: string) => void;
}

export interface IConnector {
	id: string;
	name: string;
	type: ConnectorType;
	getter: () => any;
}

export interface IModule {
	moduleKey: string;
	type: ModuleType;
	initialized?: boolean;
	node?: any;
	connectors?: IConnector[];
}

export const Module: React.FunctionComponent<IModuleProps> = props => {
	const module = modules.get(props.moduleKey);

	if (!!module) {
		switch (module.type) {
			case 'GAIN':
				return <Gain {...props} />
			case 'OSCILLATOR':
				return <Oscillator {...props} />
			case 'MIDI_DEVICE':
				return <MidiDevice {...props} />
			case 'MIDI_OSCILLATOR':
				return <MidiOscillator {...props} />
			default:
				props.removeModule(props.moduleKey);
				return null;
		}
	}
	else {
		props.removeModule(props.moduleKey);
		return null;
	}
};
