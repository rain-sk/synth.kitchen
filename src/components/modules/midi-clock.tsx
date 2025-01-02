import React, { useCallback, useContext } from 'react';

import { MidiClockNode } from '../../audio/nodes/midi-clock';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { RadioParameter } from '../radio-parameter';
import { MidiContext } from '../../contexts/midi';
import { useNode } from '../../hooks/use-node';

const clockStateFromNode = (
	clock: MidiClockNode,
): IModuleState['MIDI_CLOCK'] => ({
	input: clock.inputName,
});

const initMidiClock = (
	clock: MidiClockNode,
	state?: IModuleState['MIDI_CLOCK'],
) => {
	if (state) {
		try {
			clock.setInput(state.input);
		} catch (e) {
			console.error(e);
		}
		return state;
	} else {
		return clockStateFromNode(clock);
	}
};

export const MidiClockModule: React.FC<{ module: IModule<'MIDI_CLOCK'> }> = ({
	module,
}) => {
	const { inputs } = useContext(MidiContext);
	const { node, state, setState } = useNode<MidiClockNode, 'MIDI_CLOCK'>(
		module,
		initMidiClock,
		() => new MidiClockNode(),
	);

	const enabled = state != undefined;

	const output = useCallback(() => node.node(), [enabled]);

	const commitInputChange = useCallback(
		(input: string) => {
			if (node) {
				node.setInput(input);
				setState({
					...state,
					input,
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
					<RadioParameter
						moduleKey={module.moduleKey}
						name="input"
						options={inputs.map((input) => input.name)}
						value={node.inputName}
						commitValueCallback={commitInputChange}
					/>
				) : (
					<p>no inputs available</p>
				)}
			</section>
		</>
	) : (
		<p>loading...</p>
	);
};
