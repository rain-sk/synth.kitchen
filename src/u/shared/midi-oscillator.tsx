import * as React from 'react';
import { IModuleProps } from './module';
import { modules } from '../unique/module-map';
import { audioContext } from '../../a/utils/audio-context';
import { Setting } from './setting';
import { Parameter } from './parameter';
import { Connector } from './connector';
import { MidiInput } from './midi-input';
import { midiToFrequency } from '../../a/utils/midi-to-frequency';

const { v4 } = require('uuid');

const scaleDetune = (currentValue: number, delta: number) => {
	return Math.min(1, Math.max(-1, currentValue + (delta / 100)));
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
	const [midiInputId] = React.useState(v4() as any);
	const [detuneId] = React.useState(v4() as any);
	const [outputId] = React.useState(v4() as any);
	const [type, setType] = React.useState('sine');
	const [detune, setDetune] = React.useState(0);

	const [output] = React.useState(audioContext.createGain());
	const [activeModules] = React.useState(new Map<number, OscillatorNode>());

	const module = modules.get(props.moduleKey);

	if (module && !module.initialized) {
		module.node = new MidiInput(midiInputId, props.moduleKey, (note: number) => {
			const osc = audioContext.createOscillator();
			osc.frequency.value = midiToFrequency(note);
			osc.type = "sawtooth";
			osc.start();
			osc.connect(output);
			activeModules.set(note, osc);
		}, (note: number) => {
			const osc = activeModules.get(note);
			if (osc) {
				try {
					osc.stop();
					osc.disconnect(output);
				} catch { }
			}
		});
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
			}
			// , {
			// 	id: detuneId,
			// 	name: 'detune',
			// 	type: 'SIGNAL_IN',
			// 	getter: () => module.node.detune
			// }
		];

		setType(module.node.type);
		// setDetune(module.node.detune.value);
	}

	const handleChangeType = React.useCallback((newType: string) => {
		(module as any).node.type = newType;
		setType(newType);
	}, [module]);

	const handleChangeDetune = React.useCallback((newDetune: number) => {
		(module as any).node.detune.value = newDetune;
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
				value={type}
				options={oscillatorTypeOptions}
				onChange={handleChangeType} />
			{/* <Parameter
				name="detune"
				moduleKey={props.moduleKey}
				id={detuneId}
				value={detune}
				display={displayDetune}
				scale={scaleDetune}
				onChange={handleChangeDetune}
				type={'SIGNAL_IN'}
				end={{
					moduleKey: props.moduleKey,
					connectorId: detuneId
				}} /> */}
			<Connector
				type="SIGNAL_OUT"
				name="output"
				moduleKey={props.moduleKey}
				connectorId={outputId} />
		</article>
	);
};
