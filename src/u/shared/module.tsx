import * as React from 'react';

import { modules } from '../unique/module-map';
import { Gain } from './gain';
import { Delay } from './delay';
import { Filter } from './filter';
import { MidiDevice } from './midi-device';
import { Oscillator } from './oscillator';
import { MidiOscillator } from './midi-oscillator';

export type ModuleType = 'GLOBAL_CONTEXT' | 'GAIN' | 'DELAY' | 'FILTER' | 'MIDI_DEVICE' | 'OSCILLATOR' | 'MIDI_OSCILLATOR';

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

	const handleRemove = React.useCallback(() => {
		props.removeModule(props.moduleKey);
	}, [props.moduleKey]);

	if (module) {
		return (
			<li className={module.type === 'FILTER' ? 'double-wide' : ''}>
				<button className="remove-module" type="button" onClick={handleRemove}>x</button>
				{
					module && (() => {
						switch (module.type) {
							case 'GAIN':
								return <Gain {...props} />;
							case 'DELAY':
								return <Delay {...props} />;
							case 'FILTER':
								return <Filter {...props} />;
							case 'OSCILLATOR':
								return <Oscillator {...props} />;
							case 'MIDI_DEVICE':
								return <MidiDevice {...props} />;
							case 'MIDI_OSCILLATOR':
								return <MidiOscillator {...props} />;
							default:
								props.removeModule(props.moduleKey);
								return null;
						}
					})()
				}
			</li>
		)
	} else {
		props.removeModule(props.moduleKey);
		return null;
	}
};
