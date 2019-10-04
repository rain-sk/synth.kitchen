import * as React from 'react';
import { IModuleProps } from './patch-module';
import { modules } from '../state/module-map';
import { audioContext } from '../io-audio/audio-context';
import { SettingRadio, SettingSelect } from './patch-module-setting';
import { Connector } from './patch-connector';
import { MidiInput } from '../io-midi/midi-input';
import { midiToFrequency } from '../io-audio/midi-to-frequency';
import { Parameter } from './patch-module-parameter';

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

interface IMidiOscillatorState {
	midiInputId: string;
	detuneId: string;
	outputId: string;
	type: OscillatorType;
	detune: number;
	output: GainNode;
	activeOscillators: Map<number, OscillatorNode>;
	detuneInput: GainNode;
}

export class MidiOscillator extends React.Component<IModuleProps, IMidiOscillatorState> {
	module = modules.get(this.props.moduleKey);
	constructor(props: IModuleProps) {
		super(props);
		this.state = {
			midiInputId: v4(),
			detuneId: v4(),
			outputId: v4(),
			type: 'sine',
			detune: 0,
			output: audioContext.createGain(),
			activeOscillators: new Map<number, OscillatorNode>(),
			detuneInput: audioContext.createGain()
		};
		this.createOscillator = this.createOscillator.bind(this);
		this.destroyOscillator = this.destroyOscillator.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
		this.handleChangeDetune = this.handleChangeDetune.bind(this);
		this.getDetuneInput = this.getDetuneInput.bind(this);
		this.getOutput = this.getOutput.bind(this);
	}

	createOscillator(note: number) {
		this.destroyOscillator(note);
		const osc = audioContext.createOscillator();
		osc.frequency.value = midiToFrequency(note);
		osc.detune.value = this.state.detune;
		osc.type = this.state.type;
		osc.start();
		this.state.detuneInput.connect(osc.detune);
		osc.connect(this.state.output);
		this.state.activeOscillators.set(note, osc);
	}

	destroyOscillator(note: number) {
		const osc = this.state.activeOscillators.get(note);
		if (osc) {
			try {
				osc.stop();
				osc.disconnect(this.state.output);
			} catch { }
		}
	}

	handleChangeType(newType: string) {
		this.state.activeOscillators.forEach((oscillator) => {
			oscillator.type = newType as OscillatorType;
		});
		this.setState({
			type: newType as OscillatorType
		});
	}

	handleChangeDetune(newDetune: number) {
		this.state.activeOscillators.forEach((oscillator) => {
			oscillator.detune.value = newDetune;
		});
		this.setState({
			detune: newDetune
		});
	}

	getOutput() {
		return this.state.output;
	}

	getDetuneInput() {
		return this.state.detuneInput;
	}

	componentDidMount() {
		if (this.module && !this.module.initialized) {
			const midiInput = new MidiInput(this.state.midiInputId, this.props.moduleKey, this.createOscillator, this.destroyOscillator)
			const detuneInput = audioContext.createGain();
			detuneInput.gain.value = 1;
			this.module.node = midiInput;
			this.module.initialized = true;
			this.module.connectors = [
				{
					id: this.state.outputId,
					name: 'output',
					type: 'SIGNAL_OUT',
					getter: this.getOutput
				}, {
					id: this.state.midiInputId,
					name: 'midi input',
					type: 'MIDI_IN',
					getter: () => (this.module as any).node
				}, {
					id: this.state.detuneId,
					name: 'detune',
					type: 'SIGNAL_IN',
					getter: this.getDetuneInput
				}
			];
		} else {
			this.module = modules.get(this.props.moduleKey);
			setTimeout(this.componentDidMount, 10);
		}
	}

	render() {
		return (
			<>
				<h2>oscillator</h2>
				<Connector
					type="MIDI_IN"
					name="midi input"
					moduleKey={this.props.moduleKey}
					connectorId={this.state.midiInputId} />
				<SettingSelect
					name="type"
					value={this.state.type}
					options={oscillatorTypeOptions}
					onChange={this.handleChangeType} />
				<Parameter
					name="detune"
					moduleKey={this.props.moduleKey}
					id={this.state.detuneId}
					value={this.state.detune}
					display={displayDetune}
					scale={scaleDetune}
					onChange={this.handleChangeDetune}
					type={'CV_IN'} />
				<Connector
					type="SIGNAL_OUT"
					name="output"
					moduleKey={this.props.moduleKey}
					connectorId={this.state.outputId} />
			</>
		);
	}
}

