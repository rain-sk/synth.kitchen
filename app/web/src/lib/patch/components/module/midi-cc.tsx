import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { MidiCcNode } from '../../audio/nodes/midi-cc';

import { IoConnectors } from '../module-ui/io-connectors';
import { MidiContext } from '../../contexts/midi';
import { NumberParameter } from '../module-ui/number-parameter';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const midiCcStateFromNode = (node: MidiCcNode): ModuleState['MIDI_CC'] => ({
	version: '0.5.0',
	input: node.inputName,
	cc: node.cc,
	max: node.max,
	min: node.min,
});

const initMidiCc = (cc: MidiCcNode, state?: ModuleState['MIDI_CC']) => {
	if (state) {
		try {
			cc.setCC(state.cc);
			cc.setInputName(state.input);
			cc.setMax(state.max);
			cc.setMin(state.min);
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

	const output = useCallback(() => node.node(), [enabled]);

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

	const commitMaxChange = useCallback(
		(max: number) => {
			if (node) {
				node.setMax(max);

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
				node.setMin(min);

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
		if (module.state.max !== node.max) {
			commitMaxChange(module.state.max);
		}
		if (module.state.min !== node.min) {
			commitMinChange(module.state.min);
		}
	}, [
		module.state,
		commitInputChange,
		commitCcChange,
		commitMaxChange,
		commitMinChange,
	]);

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
							value={node.inputName}
							commitValueCallback={commitInputChange}
						/>
						<NumberParameter
							moduleId={module.id}
							name="cc"
							value={node.cc}
							commitValueCallback={commitCcChange}
						/>
						<NumberParameter
							moduleId={module.id}
							name="max"
							value={node.max}
							commitValueCallback={commitMaxChange}
						/>
						<NumberParameter
							moduleId={module.id}
							name="min"
							value={node.min}
							commitValueCallback={commitMinChange}
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
