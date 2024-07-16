import React, { useCallback, useContext, useRef } from 'react';

import { MidiClockNode } from '../../audio/nodes/midi-clock';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { useEffectOnce } from '../../hooks/use-effect-once';
import { RadioParameter } from '../radio-parameter';
import { MidiContext } from '../../contexts/midi';

const clockStateFromNode = (
	clock: MidiClockNode
): IModuleState['MIDI_TRIGGER'] => ({
	input: clock.inputName
});

const initMidiTrigger = (
	triggerRef: React.MutableRefObject<MidiClockNode | undefined>,
	state?: IModuleState['MIDI_TRIGGER']
) => {
	triggerRef.current = new MidiClockNode();
	if (state) {
		try {
			triggerRef.current.setInput(state.input);
		} catch (e) {
			console.error(e);
		}
		return state;
	} else {
		return clockStateFromNode(triggerRef.current);
	}
};

export const MidiTriggerModule: React.FC<{
	module: IModule<'MIDI_TRIGGER'>;
}> = ({ module }) => {
	const { inputs } = useContext(MidiContext);

	const triggerRef = useRef<MidiClockNode>();
	const [state, setState] = useModuleState<'MIDI_TRIGGER'>(
		() => initMidiTrigger(triggerRef, module.state) as any,
		module.moduleKey
	);

	useEffectOnce(() => () => {
		triggerRef.current?.disconnect();
	});

	const enabled = state != undefined && triggerRef.current;

	const output = useCallback(
		() => triggerRef.current?.node() as any,
		[enabled]
	);

	const commitInputChange = useCallback(
		(input: string) => {
			if (triggerRef.current) {
				triggerRef.current.setInput(input);
				setState({
					...state,
					input
				});
			}
		},
		[state]
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
						value={triggerRef.current?.inputName as any}
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
