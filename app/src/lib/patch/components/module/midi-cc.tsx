import React, { useCallback, useContext } from 'react';

import { MidiCcNode } from '../../audio/nodes/midi-cc';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../module-ui/io-connectors';
import { MidiContext } from '../../contexts/midi';
import { NumberParameter } from '../module-ui/number-parameter';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';

const midiCcStateFromNode = (node: MidiCcNode): IModuleState['MIDI_CC'] => ({
	input: node.inputName,
	cc: node.cc,
	max: node.max,
	min: node.min,
});

const initMidiCc = (cc: MidiCcNode, state?: IModuleState['MIDI_CC']) => {
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
	module: IModule<'MIDI_CC'>;
}> = ({ module }) => {
	const { inputs } = useContext(MidiContext);

	const { node, state, setState } = useNode<MidiCcNode, 'MIDI_CC'>(
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

	return enabled ? (
		<>
			<IoConnectors
				moduleKey={module.moduleKey}
				inputAccessors={{}}
				outputAccessors={{ output }}
			/>
			<section>
				{inputs.length > 0 ? (
					<>
						<RadioParameter
							moduleKey={module.moduleKey}
							name="input"
							options={inputs.map((input) => input.name)}
							value={node.inputName}
							commitValueCallback={commitInputChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="cc"
							value={node.cc}
							commitValueCallback={commitCcChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="max"
							value={node.max}
							commitValueCallback={commitMaxChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
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
