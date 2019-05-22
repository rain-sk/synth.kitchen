import * as React from 'react';
import { IModuleProps } from './module';
import { modules } from '../unique/module-map';
import { audioContext } from '../audio/audio-context';
import { Setting } from './setting';
import { Parameter } from './parameter';
import { Connector } from './connector';

const { v4 } = require('uuid');

const scaleFrequency = (normalizedValue: number) => {
	return Math.min(22000, Math.max(0, normalizedValue * 22000));
}

const displayFrequency = (currentValue: number) => {
	if (currentValue < 100) {
		return Math.round(currentValue * 10000) / 10000;
	} else if (currentValue < 1000) {
		return Math.round(currentValue * 1000) / 1000;
	} else {
		return Math.round(currentValue * 100) / 100;
	}
}

const scaleDetune = (normalizedValue: number) => {
	return Math.min(100, Math.max(-100, (normalizedValue * 200) - 100));
}

const displayDetune = (currentValue: number) => {
	return Math.round(currentValue * 100) / 100;
}

const oscillatorTypeOptions: [string, string][] = [
	['sine', 'sin'],
	['triangle', 'tri'],
	['square', 'sqr'],
	['sawtooth', 'saw']
];

export const Oscillator: React.FunctionComponent<IModuleProps> = props => {
	const [outputId] = React.useState(v4() as any);
	const [frequencyId] = React.useState(v4() as any);
	const [detuneId] = React.useState(v4() as any);
	const [type, setType] = React.useState('sine');
	const [frequency, setFrequency] = React.useState(440);
	const [detune, setDetune] = React.useState(0);

	const module = modules.get(props.moduleKey);

	if (module && !module.initialized) {
		module.node = audioContext.createOscillator();
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
		<article>
			<h2>oscillator</h2>
			<Parameter
				name="frequency"
				moduleKey={props.moduleKey}
				id={frequencyId}
				value={frequency}
				scale={scaleFrequency}
				display={displayFrequency}
				onChange={handleChangeFrequency}
				type={'CV_IN'} />
			<Parameter
				name="detune"
				moduleKey={props.moduleKey}
				id={detuneId}
				value={detune}
				scale={scaleDetune}
				display={displayDetune}
				onChange={handleChangeDetune}
				type={'CV_IN'} />
			<Setting
				name="type"
				value={type}
				options={oscillatorTypeOptions}
				onChange={handleChangeType} />
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</article>
	);
};
