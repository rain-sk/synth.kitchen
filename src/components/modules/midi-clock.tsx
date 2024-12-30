import React, { useCallback, useContext } from 'react';

import { MidiClockNode } from '../../audio/nodes/midi-clock';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { RadioParameter } from '../radio-parameter';
import { MidiContext } from '../../contexts/midi';

const clockStateFromNode = (
	clock: MidiClockNode,
): IModuleState['MIDI_CLOCK'] => ({
	input: clock.inputName,
});

const initMidiClock = (
	clockRef: React.MutableRefObject<MidiClockNode | undefined>,
	state?: IModuleState['MIDI_CLOCK'],
) => {
	clockRef.current = new MidiClockNode();
	if (state) {
		try {
			clockRef.current.setInput(state.input);
		} catch (e) {
			console.error(e);
		}
		return state;
	} else {
		return clockStateFromNode(clockRef.current);
	}
};

export const MidiClockModule: React.FC<{ module: IModule<'MIDI_CLOCK'> }> = ({
	module,
}) => {
	const { inputs } = useContext(MidiContext);

	const [clockRef, state, setState] = useModuleState<
		'MIDI_CLOCK',
		MidiClockNode
	>(module, (ref) => () => initMidiClock(ref, module.state));

	const enabled = state != undefined;

	const output = useCallback(() => clockRef.current?.node() as any, [enabled]);

	const commitInputChange = useCallback(
		(input: string) => {
			if (clockRef.current) {
				clockRef.current.setInput(input);
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
						value={clockRef.current?.inputName as any}
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
