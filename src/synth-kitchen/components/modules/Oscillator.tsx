import * as React from 'react';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { audio } from '../../io/audio-context';
import { Setting } from './shared/Setting';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { uniqueId } from '../../io/unique-id';

const oscillatorTypeOptions: [string, string][] = [
	['sine', 'sin'],
	['triangle', 'tri'],
	['square', 'sqr'],
	['sawtooth', 'saw']
];

export const Oscillator: React.FunctionComponent<IModuleProps> = props => {
	const [outputId] = React.useState(uniqueId() as any);
	const [frequencyId] = React.useState(uniqueId() as any);
	const [detuneId] = React.useState(uniqueId() as any);
	const [type, setType] = React.useState('sine');
	const [frequency, setFrequency] = React.useState(440);
	const [detune, setDetune] = React.useState(0);

	const module = modules.get(props.moduleKey);

	if (module && !module.initialized) {
		module.node = audio.node(audio.createOscillator());
		module.node.start();
		module.initialized = true;
		module.connectors = [
			{
				id: outputId,
				name: 'output',
				type: 'SIGNAL_OUT',
				getter: () => module.node
			}, {
				id: frequencyId,
				name: 'frequency',
				type: 'CV_IN',
				getter: () => module.node.frequency
			}, {
				id: detuneId,
				name: 'detune',
				type: 'CV_IN',
				getter: () => module.node.detune
			}
		];

		setType(module.node.type);
		setFrequency(module.node.frequency.value);
		setDetune(module.node.detune.value);
	}

	const handleChangeType = React.useCallback((newType: string) => {
		(module as any).node.type = newType;
		setType(newType);
	}, [module]);

	const handleChangeFrequency = React.useCallback((newFrequency: number) => {
		(module as any).node.frequency.value = newFrequency;
		setFrequency(newFrequency);
	}, [module]);

	const handleChangeDetune = React.useCallback((newDetune: number) => {
		(module as any).node.detune.value = newDetune;
		setDetune(newDetune);
	}, [module]);

	return (
		<>
			<h2 className="visually-hidden">oscillator</h2>
			<Parameter
				name="frequency"
				moduleKey={props.moduleKey}
				id={frequencyId}
				value={frequency}
				scale={s => s}
				display={d => d}
				min={0}
				max={20000}
				onChange={handleChangeFrequency}
				type={'CV_IN'} />
			<Parameter
				name="detune"
				moduleKey={props.moduleKey}
				id={detuneId}
				value={detune}
				scale={s => s}
				display={d => d}
				min={-100}
				max={100}
				onChange={handleChangeDetune}
				type={'CV_IN'} />
			<Setting
				type="select"
				name="type"
				value={type}
				options={oscillatorTypeOptions}
				onChange={handleChangeType} />
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</>
	);
};
