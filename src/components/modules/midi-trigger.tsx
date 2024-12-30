import React, { useCallback, useContext, useRef } from 'react';

import { MidiTriggerNode } from '../../audio/nodes/midi-trigger';

import { useModuleState } from '../../hooks/use-module-state';
import { IModule, IModuleState } from '../../state/types/module';
import { IoConnectors } from '../io-connectors';
import { RadioParameter } from '../radio-parameter';
import { MidiContext } from '../../contexts/midi';

const noteOptions = (() => {
	const options = ['all'];
	for (let i = 0; i < 128; i++) {
		options.push(String(i));
	}
	return options;
})();

const clockStateFromNode = (
	clock: MidiTriggerNode,
): IModuleState['MIDI_TRIGGER'] => ({
	input: clock.inputName,
	note: clock.note,
});

const initMidiTrigger = (
	triggerRef: React.MutableRefObject<MidiTriggerNode | undefined>,
	state?: IModuleState['MIDI_TRIGGER'],
) => {
	triggerRef.current = new MidiTriggerNode();
	if (state) {
		try {
			triggerRef.current.setInput(state.input);
			triggerRef.current.setNote(state.note);
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

	const triggerRef = useRef<MidiTriggerNode>();
	const [state, setState] = useModuleState<'MIDI_TRIGGER', MidiTriggerNode>(
		triggerRef,
		module,
		() => initMidiTrigger(triggerRef, module.state),
	);

	const enabled = state != undefined;

	const output = useCallback(
		() => triggerRef.current?.node() as any,
		[enabled],
	);

	const commitInputChange = useCallback(
		(input: string) => {
			if (triggerRef.current) {
				triggerRef.current.setInput(input);
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
			if (triggerRef.current) {
				if (note === 'all') {
					triggerRef.current.setNote(note);

					setState({
						...state,
						note,
					});
				} else {
					const num = Number(note);
					triggerRef.current.setNote(Number(num));

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
							value={triggerRef.current?.inputName as any}
							commitValueCallback={commitInputChange}
						/>
						<RadioParameter
							moduleKey={module.moduleKey}
							name="note"
							options={noteOptions}
							value={triggerRef.current?.note as any}
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
