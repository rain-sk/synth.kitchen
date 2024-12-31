import React, { useCallback, useContext } from 'react';

import { MidiCcNode } from '../../audio/nodes/midi-cc';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { RadioParameter } from '../radio-parameter';
import { MidiContext } from '../../contexts/midi';
import { NumberParameter } from '../number-parameter';
import { useNodeRef } from '../../hooks/use-node-ref';

const midiCcStateFromNode = (node: MidiCcNode): IModuleState['MIDI_CC'] => ({
	input: node.inputName,
	cc: node.cc,
	max: node.max,
	min: node.min,
});

const initMidiTrigger = (
	ccRef: React.MutableRefObject<MidiCcNode | undefined>,
	state?: IModuleState['MIDI_CC'],
) => {
	if (!ccRef.current) {
		throw Error('uninitialized ref');
	}

	if (state) {
		try {
			ccRef.current.setCC(state.cc);
			ccRef.current.setInput(state.input);
			ccRef.current.setMax(state.max);
			ccRef.current.setMin(state.min);
		} catch (e) {
			console.error(e);
		}
		return state;
	} else {
		return midiCcStateFromNode(ccRef.current);
	}
};

export const MidiCcModule: React.FC<{
	module: IModule<'MIDI_CC'>;
}> = ({ module }) => {
	const { inputs } = useContext(MidiContext);

	const ccRef = useNodeRef(() => new MidiCcNode());
	const [state, setState] = useModuleState<'MIDI_CC', MidiCcNode>(
		ccRef,
		module,
		() => initMidiTrigger(ccRef, module.state),
	);

	const enabled = state != undefined;

	const output = useCallback(() => ccRef.current.node(), [enabled]);

	const commitInputChange = useCallback(
		(input: string) => {
			if (ccRef.current) {
				ccRef.current.setInput(input);
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
			if (ccRef.current) {
				ccRef.current.setCC(cc);

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
			if (ccRef.current) {
				ccRef.current.setMax(max);

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
			if (ccRef.current) {
				ccRef.current.setMin(min);

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
							value={ccRef.current.inputName}
							commitValueCallback={commitInputChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="cc"
							value={ccRef.current.cc}
							commitValueCallback={commitCcChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="max"
							value={ccRef.current.max}
							commitValueCallback={commitMaxChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="min"
							value={ccRef.current.min}
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
