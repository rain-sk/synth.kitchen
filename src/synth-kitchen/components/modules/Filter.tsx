import * as React from 'react';
import { audioContext } from '../../state/aud-io/audio-context';
import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { Parameter } from './shared/Parameter';
import { Connector } from './shared/Connector';
import { Setting } from './shared/Setting';
import { uniqueId } from '../../io/utils/unique-id';

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

const scaleQ = (normalizedValue: number) => {
	return Math.min(100, Math.max(0, (normalizedValue * 100)));
}

const displayQ = (currentValue: number) => {
	return Math.round(currentValue * 100) / 100;
}

const scaleGain = (normalizedValue: number) => {
	return Math.min(1, Math.max(0, (normalizedValue)));
}

const displayGain = (currentValue: number) => {
	return Math.round(currentValue * 100) / 100;
}

const filterTypeOptions: [string, string][] = [
	['lowpass', 'low-pass'],
	['highpass', 'high-pass'],
	['bandpass', 'band-pass'],
	['lowshelf', 'low-shelf'],
	['highshelf', 'high-shelf'],
	['peaking', 'peaking'],
	['notch', 'notch'],
	['allpass', 'all-pass']
];

export const Filter: React.FunctionComponent<IModuleProps> = props => {
	const [inputId] = React.useState(uniqueId() as any);
	const [outputId] = React.useState(uniqueId() as any);
	const [frequencyId] = React.useState(uniqueId() as any);
	const [detuneId] = React.useState(uniqueId() as any);
	const [qId] = React.useState(uniqueId() as any);
	const [gainId] = React.useState(uniqueId() as any);
	const [frequency, setFrequency] = React.useState(1000);
	const [detune, setDetune] = React.useState(0);
	const [q, setQ] = React.useState(100);
	const [gain, setGain] = React.useState(1);
	const [type, setType] = React.useState('lowpass');

	const module = modules.get(props.moduleKey);

	if (module && !module.initialized) {
		module.node = audioContext.createBiquadFilter();
		module.initialized = true;
		module.connectors = [
			{
				id: inputId,
				name: 'input',
				type: 'SIGNAL_IN',
				getter: () => module.node
			}, {
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
			}, {
				id: qId,
				name: 'Q',
				type: 'CV_IN',
				getter: () => module.node.Q
			}, {
				id: gainId,
				name: 'gain',
				type: 'CV_IN',
				getter: () => module.node.gain
			}
		];
		setFrequency(module.node.frequency.value);
		setDetune(module.node.frequency.value);
		setQ(module.node.frequency.value);
		setGain(module.node.frequency.value);
		setType(module.node.type);
	}

	const handleChangeFrequency = React.useCallback((newFrequency: number) => {
		(module as any).node.frequency.value = newFrequency;
		setFrequency(newFrequency);
	}, [module]);

	const handleChangeDetune = React.useCallback((newDetune: number) => {
		(module as any).node.detune.value = newDetune;
		setDetune(newDetune);
	}, [module]);

	const handleChangeQ = React.useCallback((newQ: number) => {
		(module as any).node.Q.value = newQ;
		setQ(newQ);
	}, [module]);

	const handleChangeGain = React.useCallback((newGain: number) => {
		(module as any).node.gain.value = newGain;
		setGain(newGain);
	}, [module]);

	const handleChangeType = React.useCallback((newType: string) => {
		(module as any).node.type = newType;
		setType(newType);
	}, [module]);

	return (
		<>
			<h2 className="visually-hidden">delay</h2>
			<Connector
				type="SIGNAL_IN"
				name="input"
				moduleKey={props.moduleKey}
				connectorId={inputId} />
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
			<Parameter
				name="Q"
				moduleKey={props.moduleKey}
				id={qId}
				value={q}
				scale={scaleQ}
				display={displayQ}
				onChange={handleChangeQ}
				type={'CV_IN'} />
			<Parameter
				name="gain"
				moduleKey={props.moduleKey}
				id={gainId}
				value={gain}
				scale={scaleGain}
				display={displayGain}
				onChange={handleChangeGain}
				type={'CV_IN'} />
			<Setting
				type="radio"
				name="type"
				value={type}
				options={filterTypeOptions}
				onChange={handleChangeType} />
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</>
	);
};
