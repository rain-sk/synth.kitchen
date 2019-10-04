import * as React from 'react';
import { MidiOutput } from '../io-midi/midi-output';
import { IModuleProps } from './patch-module';
import { modules } from '../state/module-map';
import { Connector } from './patch-connector';
import { SettingSelect } from './patch-module-setting';
import webmidi from 'webmidi';

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

const { v4 } = require('uuid');

export const MidiDevice: React.FunctionComponent<IModuleProps> = props => {
	const [outputId] = React.useState(v4() as any);
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
	}, [module, inputDevice]);

	const handleChangeInputChannel = React.useCallback((newChannel: string) => {
		module && module.node.switchInputChannel(newChannel);
		setInputChannel(newChannel);
	}, [module, inputChannel]);

	return (
		<>
			<h2>midi device</h2>
			<SettingSelect
				name="device"
				value={inputDevice}
				options={inputDevices.map((device: any) => [device.name as string, device.name as string])}
				onChange={handleChangeInputDevice} />
			<SettingSelect
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
