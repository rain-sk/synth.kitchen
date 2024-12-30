import React, { useCallback, useContext } from 'react';

import { MidiCcNode } from '../../audio/nodes/midi-cc';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { RadioParameter } from '../radio-parameter';
import { MidiContext } from '../../contexts/midi';
import { NumberParameter } from '../number-parameter';

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
	ccRef.current = new MidiCcNode();
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

	const [ccRef, state, setState] = useModuleState<'MIDI_CC', MidiCcNode>(
		module,
		(ref) => () => initMidiTrigger(ref, module.state),
	);

	const enabled = state != undefined;

	const output = useCallback(() => ccRef.current?.node() as any, [enabled]);

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
							value={ccRef.current?.inputName as any}
							commitValueCallback={commitInputChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="cc"
							value={ccRef.current?.cc as any}
							commitValueCallback={commitCcChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="max"
							value={ccRef.current?.max as any}
							commitValueCallback={commitMaxChange}
						/>
						<NumberParameter
							moduleKey={module.moduleKey}
							name="min"
							value={ccRef.current?.min as any}
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
