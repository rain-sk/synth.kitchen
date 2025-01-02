import React, { useCallback, useContext } from 'react';

import { MidiTriggerNode } from '../../audio/nodes/midi-trigger';

import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../module-ui/io-connectors';
import { RadioParameter } from '../module-ui/radio-parameter';
import { MidiContext } from '../../contexts/midi';
import { useNode } from './use-node';

const noteOptions = (() => {
	const options = ['all'];
	for (let i = 0; i < 128; i++) {
		options.push(String(i));
	}
	return options;
})();

const midiTriggerStateFromNode = (
	clock: MidiTriggerNode,
): IModuleState['MIDI_TRIGGER'] => ({
	input: clock.inputName,
	note: clock.note,
});

const initMidiTrigger = (
	trigger: MidiTriggerNode,
	state?: IModuleState['MIDI_TRIGGER'],
) => {
	if (state) {
		try {
			trigger.setInput(state.input);
			trigger.setNote(state.note);
		} catch (e) {
			console.error(e);
		}
		return state;
	} else {
		return midiTriggerStateFromNode(trigger);
	}
};

export const MidiTriggerModule: React.FC<{
	module: IModule<'MIDI_TRIGGER'>;
}> = ({ module }) => {
	const { inputs } = useContext(MidiContext);

	const { node, state, setState } = useNode<MidiTriggerNode, 'MIDI_TRIGGER'>(
		module,
		initMidiTrigger,
		() => new MidiTriggerNode(),
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

	const commitNoteChange = useCallback(
		(note: string) => {
			if (node) {
				if (note === 'all') {
					node.setNote(note);

					setState({
						...state,
						note,
					});
				} else {
					const num = Number(note);
					node.setNote(Number(num));

					setState({
						...state,
						note: num,
					});
				}
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
						<RadioParameter
							moduleKey={module.moduleKey}
							name="note"
							options={noteOptions}
							value={`${node.note}`}
							commitValueCallback={commitNoteChange}
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
