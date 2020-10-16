import * as React from 'react';

import { IModuleProps } from './BaseModuleOld';
import { modules } from '../../state/module-map';
import { audio } from '../../io/audio-context';
import { Setting } from './shared/Setting';
import { Connector } from './shared/Connector';
import { MidiInput } from '../../io/midi-input';
import { midiToFrequency } from '../../io/midi-to-frequency';
import { Parameter } from './shared/Parameter';
import { IGainNode, IAudioContext, IOscillatorNode } from 'standardized-audio-context';
import { uniqueId } from '../../io/unique-id';

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
	frequencyId: string;
	outputId: string;
	type: OscillatorType;
	detune: number;
	output: IGainNode<IAudioContext>;
	activeOscillators: Map<number, [IOscillatorNode<IAudioContext>, IGainNode<IAudioContext>]>;
	detuneInput: IGainNode<IAudioContext>;
	frequencyInput: IGainNode<IAudioContext>;
}

export class MidiOscillator extends React.Component<IModuleProps, IMidiOscillatorState> {
	module = modules.get(this.props.moduleKey);
	constructor(props: IModuleProps) {
		super(props);
		this.state = {
			midiInputId: uniqueId(),
			detuneId: uniqueId(),
			frequencyId: uniqueId(),
			outputId: uniqueId(),
			type: 'sine',
			detune: 0,
			output: audio.node(audio.createGain()),
			activeOscillators: new Map<number, [IOscillatorNode<IAudioContext>, IGainNode<IAudioContext>]>(),
			detuneInput: audio.node(audio.createGain()),
			frequencyInput: audio.node(audio.createGain()),
		};
	}

	createOscillator = (note: number) => {
		this.destroyOscillator(note);
		const osc = audio.node(audio.createOscillator());
		osc.frequency.value = midiToFrequency(note);
		osc.detune.value = this.state.detune;
		osc.type = this.state.type;
		const gain = audio.node(audio.createGain());
		gain.gain.value = 0;
		gain.gain.setTargetAtTime(1, audio.context.currentTime, 0.03);
		osc.start(audio.context.currentTime + 0.01);
		this.state.detuneInput.connect(osc.detune as any);
		this.state.frequencyInput.connect(osc.frequency as any);
		osc.connect(gain);
		gain.connect(this.state.output);
		this.state.activeOscillators.set(note, [osc, gain]);
	}

	destroyOscillator = (note: number) => {
		const oscGainPair = this.state.activeOscillators.get(note);
		if (oscGainPair) {
			try {
				const [osc, gain] = oscGainPair;
				osc.stop();
				osc.disconnect(gain);
				gain.disconnect(this.state.output);
			} catch { }
		}
	}

	handleChangeType = (newType: string) => {
		this.state.activeOscillators.forEach((oscillatorGainPair) => {
			oscillatorGainPair[0].type = newType as OscillatorType;
		});
		this.setState({
			type: newType as OscillatorType
		});
	}

	handleChangeDetune = (newDetune: number) => {
		this.state.activeOscillators.forEach((oscillatorGainPair) => {
			oscillatorGainPair[0].detune.value = newDetune;
		});
		this.setState({
			detune: newDetune
		});
	}

	getOutput = () => {
		return this.state.output;
	}

	getDetuneInput = () => {
		return this.state.detuneInput;
	}

	getFrequencyInput = () => {
		return this.state.frequencyInput;
	}

	componentDidMount = () => {
		if (this.module && !this.module.initialized) {
			const midiInput = new MidiInput(this.state.midiInputId, this.props.moduleKey, this.createOscillator, this.destroyOscillator)
			const detuneInput = this.getDetuneInput();
			detuneInput.gain.value = 1;
			const frequencyInput = this.getFrequencyInput();
			frequencyInput.gain.value = 1;
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
				}, {
					id: this.state.frequencyId,
					name: 'frequency',
					type: 'SIGNAL_IN',
					getter: this.getFrequencyInput
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
				<h2 className="visually-hidden">oscillator</h2>
				<Connector
					type="MIDI_IN"
					name="midi input"
					moduleKey={this.props.moduleKey}
					connectorId={this.state.midiInputId} />
				<Setting
					type="select"
					name="type"
					value={this.state.type}
					options={oscillatorTypeOptions}
					onChange={this.handleChangeType} />
				<Parameter
					name="detune"
					moduleKey={this.props.moduleKey}
					id={this.state.detuneId}
					value={this.state.detune}
					scale={s => s}
					display={d => d}
					onChange={this.handleChangeDetune}
					type={'CV_IN'} />
				<Parameter
					name="frequency"
					moduleKey={this.props.moduleKey}
					id={this.state.frequencyId}
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

