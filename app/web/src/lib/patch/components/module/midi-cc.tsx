import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { IAudioParam } from 'standardized-audio-context';
import {
	MIDI_CC_STATE_VERSIONS,
	Module,
	ModuleState,
	ModuleType,
} from 'synth.kitchen-shared';

import { MidiCcNode } from '../../audio/nodes/midi-cc';

import { IoConnectors } from '../module-ui/io-connectors';
import { MidiContext } from '../../contexts/midi';
import { NumberParameter } from '../module-ui/number-parameter';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import { audioContext } from '../../audio';
import { WebMidi } from 'webmidi';

const midiCcStateFromNode = (node: MidiCcNode): ModuleState['MIDI_CC'] => ({
	version: MIDI_CC_STATE_VERSIONS[0],
	input: node.inputName,
	cc: node.cc,
	channel: node.channel,
	max: node.max?.value ?? 1,
	min: node.min?.value ?? 0,
});

const initMidiCc = (cc: MidiCcNode, state?: ModuleState['MIDI_CC']) => {
	if (state) {
		try {
			cc.setCC(state.cc);
			cc.setChannel(state.channel);
			cc.setInputName(state.input ? state.input : WebMidi.inputs[0].name);
			cc.max?.setValueAtTime(state.max, audioContext.currentTime);
			cc.min?.setValueAtTime(state.min, audioContext.currentTime);
		} catch (e) {
			console.error(e);
		}
		return state;
	} else {
		return midiCcStateFromNode(cc);
	}
};

export const MidiCcModule: React.FC<{
	module: Module<ModuleType.MIDI_CC>;
}> = ({ module }) => {
	const { inputs } = useContext(MidiContext);

	const { node, state, setState } = useNode<MidiCcNode, ModuleType.MIDI_CC>(
		module,
		initMidiCc,
		() => new MidiCcNode(),
	);

	const enabled = state != undefined;

	const output = useCallback(() => node.output(), [enabled]);

	const commitInputChange = useCallback(
		(input: string) => {
			if (node) {
				node.setInputName(input);
				setState({
					...state,
					input,
				});
			}
		},
		[state],
	);

	const commitCcChange = useCallback(
		(cc: number) => {
			cc = Math.max(0, Math.min(127, Math.round(cc)));

			if (node) {
				node.setCC(cc);

				setState({
					...state,
					cc,
				});
			}
		},
		[state],
	);

	const commitChannelChange = useCallback(
		(channel: number) => {
			channel = Math.max(1, Math.min(16, Math.round(channel)));

			if (node) {
				node.setChannel(channel);

				setState({
					...state,
					channel,
				});
			}
		},
		[state],
	);

	const commitMaxChange = useCallback(
		(max: number) => {
			if (node) {
				node.max?.setTargetAtTime(max, audioContext.currentTime, 0.0003);
				setState({
					...state,
					max,
				});
			}
		},
		[state],
	);

	const commitMinChange = useCallback(
		(min: number) => {
			if (node) {
				node.min?.setTargetAtTime(min, audioContext.currentTime, 0.0003);
				setState({
					...state,
					min,
				});
			}
		},
		[state],
	);

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.input !== node.inputName) {
			commitInputChange(module.state.input);
		}
		if (module.state.cc !== node.cc) {
			commitCcChange(module.state.cc);
		}
		if (module.state.channel !== node.channel) {
			commitChannelChange(module.state.channel);
		}
		if (module.state.max !== node.max?.value) {
			commitMaxChange(module.state.max);
		}
		if (module.state.min !== node.min?.value) {
			commitMinChange(module.state.min);
		}
	}, [
		module.state,
		commitInputChange,
		commitCcChange,
		commitChannelChange,
		commitMaxChange,
		commitMinChange,
	]);

	const minAccessor = useCallback(() => node.min as IAudioParam, [node]);
	const maxAccessor = useCallback(() => node.max as IAudioParam, [node]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{}}
				outputAccessors={{ output }}
			/>
			<section>
				{inputs.length > 0 ? (
					<>
						<RadioParameter
							moduleId={module.id}
							name="input"
							options={inputs.map((input) => input.name)}
							value={state.input}
							commitValueCallback={commitInputChange}
						/>
						<NumberParameter
							moduleId={module.id}
							name="cc"
							value={state.cc}
							commitValueCallback={commitCcChange}
						/>
						<NumberParameter
							moduleId={module.id}
							name="channel"
							value={state.channel}
							commitValueCallback={commitChannelChange}
						/>
						<NumberParameter
							moduleId={module.id}
							name="max"
							value={state.max}
							commitValueCallback={commitMaxChange}
							paramAccessor={maxAccessor}
						/>
						<NumberParameter
							moduleId={module.id}
							name="min"
							value={state.min}
							commitValueCallback={commitMinChange}
							paramAccessor={minAccessor}
						/>
					</>
				) : (
					<p>no inputs available</p>
				)}
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
