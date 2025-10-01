import React, { useCallback, useContext } from 'react';
import { ModulePosition, ModuleType } from 'synth.kitchen-shared';

import { midi } from '../../midi';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { INVALID_POSITION } from '../../state/constants/positions';

const soundModules: ModuleType[] = [ModuleType.OSCILLATOR, ModuleType.NOISE];

const effectModules: ModuleType[] = [
	ModuleType.COMPRESSOR,
	ModuleType.DELAY,
	ModuleType.FILTER,
	ModuleType.GAIN,
	ModuleType.LIMITER,
	ModuleType.PAN,
];

const utilModules = (): ModuleType[] =>
	midi.initialized
		? [
				ModuleType.CLOCK,
				ModuleType.SEQUENCER,
				ModuleType.ENVELOPE,
				ModuleType.VCA,
				ModuleType.SHIFT,
				ModuleType.SCOPE,
				ModuleType.MIDI_CC,
				ModuleType.MIDI_CLOCK,
				ModuleType.MIDI_TRIGGER,
		  ]
		: [
				ModuleType.CLOCK,
				ModuleType.SEQUENCER,
				ModuleType.ENVELOPE,
				ModuleType.VCA,
				ModuleType.SHIFT,
				ModuleType.SCOPE,
		  ];

export const AddModule: React.FC<{ position?: ModulePosition }> = ({
	position,
}) => {
	const { dispatch } = useContext(PatchContext);

	const handleAddModule = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const moduleType = e.target.value;
			if (moduleType !== '' && position) {
				dispatch(
					patchActions.addModuleAction(moduleType as ModuleType, position),
				);
			}
		},
		[dispatch, position],
	);

	return (
		<select
			id="add-module"
			value=""
			onKeyDown={(e: any) => e.stopPropagation()}
			onMouseDown={(e: any) => e.stopPropagation()}
			onChange={handleAddModule}
			style={
				position && position !== INVALID_POSITION
					? {
							position: 'absolute',
							left: position[0],
							top: position[1] - 40,
							transform: 'translate(-50%, -50%)',
							transition: 'all .001s ease',
					  }
					: {}
			}
		>
			<option value="">add module</option>
			<optgroup label="Sounds">
				{soundModules.map((type) => (
					<option
						key={type}
						value={type}
					>{`${type.toLocaleLowerCase()}`}</option>
				))}
			</optgroup>
			<optgroup label="Effects">
				{effectModules.map((type) => (
					<option
						key={type}
						value={type}
					>{`${type.toLocaleLowerCase()}`}</option>
				))}
			</optgroup>
			<optgroup label="Control">
				{utilModules().map((type) => (
					<option
						key={type}
						value={type}
					>{`${type.toLocaleLowerCase()}`}</option>
				))}
			</optgroup>
		</select>
	);
};
