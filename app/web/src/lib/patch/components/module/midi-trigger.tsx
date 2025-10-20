import React, { useCallback, useContext, useEffect, useRef } from 'react';
import {
	MIDI_TRIGGER_STATE_VERSIONS,
	Module,
	ModuleState,
	ModuleType,
} from 'synth.kitchen-shared';

import { MidiTriggerNode } from '../../audio/nodes/midi-trigger';

import { IoConnectors } from '../module-ui/io-connectors';
import { MidiContext } from '../../contexts/midi';
import { RadioParameter } from '../module-ui/radio-parameter';
import { useNode } from './use-node';
import { WebMidi } from 'webmidi';

const noteOptions = (() => {
	const options = ['all'];
	for (let i = 0; i < 128; i++) {
		options.push(String(i));
	}
	return options;
})();

const midiTriggerStateFromNode = (
	clock: MidiTriggerNode,
): ModuleState['MIDI_TRIGGER'] => ({
	version: MIDI_TRIGGER_STATE_VERSIONS[0],
	input: clock.inputName,
	note: clock.note,
});

const initMidiTrigger = (
	trigger: MidiTriggerNode,
	state?: ModuleState['MIDI_TRIGGER'],
) => {
	if (state) {
		try {
			trigger.setInput(
				state.input ? state.input : WebMidi.inputs[0]?.name ?? '',
			);
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
	module: Module<ModuleType.MIDI_TRIGGER>;
}> = ({ module }) => {
	const { inputs } = useContext(MidiContext);

	const { node, state, setState } = useNode<
		MidiTriggerNode,
		ModuleType.MIDI_TRIGGER
	>(module, initMidiTrigger, () => new MidiTriggerNode());

	const enabled = state != undefined;

	const output = useCallback(() => node.output(), [enabled]);

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
	const moduleStateRef = useRef(module.state);
	useEffect(() => {
		if (moduleStateRef.current === module.state) {
			return;
		}
		moduleStateRef.current = module.state;
		if (module.state.input !== node.inputName) {
			commitInputChange(module.state.input);
		}
		if (module.state.note !== node.note) {
			commitNoteChange(`${module.state.note}`);
		}
	}, [module.state, commitInputChange, commitNoteChange]);

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
						<RadioParameter
							moduleId={module.id}
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
