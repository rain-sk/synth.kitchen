import * as React from 'react';
import { IModuleProps } from './module';
import { modules } from '../unique/module-map';
import { audioContext } from '../../a/utils/audio-context';
import { Setting } from './setting';
import { Connector } from './connector';
import { MidiInput } from './midi-input';
import { midiToFrequency } from '../../a/utils/midi-to-frequency';
import { Parameter } from './parameter';

const { v4 } = require('uuid');

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

export const MidiOscillator: React.FunctionComponent<IModuleProps> = props => {
	const module = modules.get(props.moduleKey);

	const [midiInputId] = React.useState(v4() as any);
	const [detuneId] = React.useState(v4() as any);
	const [outputId] = React.useState(v4() as any);
	const [oscillatorType, setOscillatorType] = React.useState({ type: 'sine' as OscillatorType });
	const [detune, setDetune] = React.useState(0);

	const [output] = React.useState(audioContext.createGain());
	const [activeModules] = React.useState(new Map<number, OscillatorNode>());

	const [detuneInput] = React.useState(audioContext.createGain());

	const createOscillator = React.useCallback((note: number) => {
		const osc = audioContext.createOscillator();
		osc.frequency.value = midiToFrequency(note);
		osc.detune.value = detune;
		osc.type = 'sawtooth';//oscillatorType.type;
		osc.start();
		detuneInput.connect(osc.detune);
		osc.connect(output);
		activeModules.set(note, osc);
	}, [detune, oscillatorType, detuneInput]);

	const destroyOscillator = React.useCallback((note: number) => {
		const osc = activeModules.get(note);
		if (osc) {
			try {
				osc.stop();
				osc.disconnect(output);
			} catch { }
		}
	}, []);

	const [midiInput] = React.useState(new MidiInput(midiInputId, props.moduleKey, createOscillator, destroyOscillator));

	if (module && !module.initialized) {
		const detuneInput = audioContext.createGain();
		detuneInput.gain.value = 1;
		module.node = midiInput;
		module.initialized = true;
		module.connectors = [
			{
				id: outputId,
				name: 'output',
				type: 'SIGNAL_OUT',
				getter: () => output
			}, {
				id: midiInputId,
				name: 'midi input',
				type: 'MIDI_IN',
				getter: () => module.node
			}, {
				id: detuneId,
				name: 'detune',
				type: 'SIGNAL_IN',
				getter: () => detuneInput
			}
		];
	}

	const handleChangeType = React.useCallback((newType: string) => {
		activeModules.forEach((module) => {
			module.type = newType as OscillatorType;
		});
		setOscillatorType({ type: newType as OscillatorType });
	}, [module]);

	const handleChangeDetune = React.useCallback((newDetune: number) => {
		activeModules.forEach((module) => {
			module.detune.value = newDetune;
		});
		setDetune(newDetune);
	}, [module]);

	return (
		<article>
			<h2>oscillator</h2>
			<Connector
				type="MIDI_IN"
				name="midi input"
				moduleKey={props.moduleKey}
				connectorId={midiInputId} />
			<Setting
				name="type"
				value={oscillatorType.type}
				options={oscillatorTypeOptions}
				onChange={handleChangeType} />
			<Parameter
				name="detune"
				moduleKey={props.moduleKey}
				id={detuneId}
				value={detune}
				display={displayDetune}
				scale={scaleDetune}
				onChange={handleChangeDetune}
				type={'CV_IN'} />
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</article>
	);
};
