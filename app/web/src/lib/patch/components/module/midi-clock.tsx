import React, { useCallback, useContext } from 'react';

import { MidiClockNode } from '../../audio/nodes/midi-clock';

import { IoConnectors } from '../module-ui/io-connectors';
import { MidiContext } from '../../contexts/midi';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import { Module, ModuleState, ModuleType } from 'synth.kitchen-shared';

const clockStateFromNode = (
	clock: MidiClockNode,
): ModuleState['MIDI_CLOCK'] => ({
	version: '0.5.0',
	input: clock.inputName,
});

const initMidiClock = (
	clock: MidiClockNode,
	state?: ModuleState['MIDI_CLOCK'],
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

export const MidiClockModule: React.FC<{
	module: Module<ModuleType.MIDI_CLOCK>;
}> = ({ module }) => {
	const { inputs } = useContext(MidiContext);
	const { node, state, setState } = useNode<
		MidiClockNode,
		ModuleType.MIDI_CLOCK
	>(module, initMidiClock, () => new MidiClockNode());

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
