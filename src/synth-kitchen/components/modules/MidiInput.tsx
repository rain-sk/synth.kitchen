import * as React from 'react';
import webmidi from 'webmidi';

import { MidiOutput } from '../../io/midi-output';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { Connector } from './shared/Connector';
import { Setting } from './shared/Setting';
import { uniqueId } from '../../io/unique-id';

const channelOptions: [string, string][] = [
	['all', 'all'],
	['1', '1'],
	['2', '2'],
	['3', '3'],
	['4', '4'],
	['5', '5'],
	['6', '6'],
	['7', '7'],
	['8', '8'],
	['9', '9'],
	['10', '10'],
	['11', '11'],
	['12', '12'],
	['13', '13'],
	['14', '14'],
	['15', '15'],
	['16', '16']
];

export const MidiInput: React.FunctionComponent<IModuleProps> = props => {
	const [outputId] = React.useState(uniqueId() as any);
	const [inputDevices] = React.useState(webmidi.inputs);
	const [inputDevice, setInputDevice] = React.useState('');
	const [inputChannel, setInputChannel] = React.useState('all');
	const [module] = React.useState(modules.get(props.moduleKey));

	if (module && !module.initialized) {
		module.node = new MidiOutput();
		module.initialized = true;
		module.connectors = [
			{
				id: outputId,
				name: 'output',
				type: 'MIDI_OUT',
				getter: () => module.node
			}
		]
	}

	const handleChangeInputDevice = React.useCallback((newDevice: string) => {
		module && module.node.switchInputDevice(newDevice);
		setInputDevice(newDevice);
	}, [module]);

	const handleChangeInputChannel = React.useCallback((newChannel: string) => {
		module && module.node.switchInputChannel(newChannel);
		setInputChannel(newChannel);
	}, [module]);

	return (
		<>
			<h2 className="visually-hidden">midi device</h2>
			<Setting
				type="select"
				name="device"
				value={inputDevice}
				options={inputDevices.map((device: any) => [device.name as string, device.name as string])}
				onChange={handleChangeInputDevice} />
			<Setting
				type="select"
				name="channel"
				value={inputChannel}
				options={channelOptions}
				onChange={handleChangeInputChannel} />
			<Connector
				type="MIDI_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</>
	);
};
