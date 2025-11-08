import React, { useCallback, useContext, useEffect, useRef } from 'react';

import { MidiClockNode } from '../../audio/nodes/midi-clock';

import { IoConnectors } from '../module-ui/io-connectors';
import { MidiContext } from '../../contexts/midi';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import {
	MIDI_CLOCK_STATE_VERSIONS,
	Module,
	ModuleState,
	ModuleType,
} from 'synth.kitchen-shared';
import { WebMidi } from 'webmidi';

const clockStateFromNode = (
	clock: MidiClockNode,
): ModuleState['MIDI_CLOCK'] => ({
	version: MIDI_CLOCK_STATE_VERSIONS[0],
	input: clock.inputName,
});

const initMidiClock = (
	clock: MidiClockNode,
	state?: ModuleState['MIDI_CLOCK'],
) => {
	if (state) {
		try {
			clock.setInput(state.input ? state.input : WebMidi.inputs[0]?.name ?? '');
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

	const trigger = useCallback(() => node.node(), [enabled]);

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

	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.input !== node.inputName) {
			commitInputChange(module.state.input);
		}
	}, [module.state, commitInputChange]);

	return enabled ? (
		<>
			<IoConnectors
				moduleId={module.id}
				inputAccessors={{}}
				outputAccessors={{ trigger }}
			/>
			<section>
				{inputs.length > 0 ? (
					<RadioParameter
						moduleId={module.id}
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
