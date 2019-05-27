import * as React from 'react';
import { MidiOutput } from './midi-output';
import { IModuleProps } from './module';
import { modules } from './module-map';
import { Connector } from './connector';
import { Setting } from './setting';
import webmidi from 'webmidi';


const { v4 } = require('uuid');

export const MidiDevice: React.FunctionComponent<IModuleProps> = props => {
	const [outputId] = React.useState(v4() as any);
	const [inputDevices] = React.useState(webmidi.inputs);
	const [inputDevice, setInputDevice] = React.useState('');
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

	return (
		<article>
			<h2>midi device</h2>
			<Setting
				name="device"
				value={inputDevice}
				options={inputDevices.map((device: any) => [device.name as string, device.name as string])}
				onChange={handleChangeInputDevice} />
			<Connector
				type="MIDI_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</article>
	);
};
