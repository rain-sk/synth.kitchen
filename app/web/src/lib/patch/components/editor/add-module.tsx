import React, { useCallback, useContext } from 'react';
import { ModulePosition, ModuleType } from 'synth.kitchen-shared';

import { midi } from '../../midi';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { INVALID_POSITION } from '../../state/constants/positions';
import { Key } from '../../constants/key';

const soundModules: ModuleType[] = [ModuleType.OSCILLATOR, ModuleType.NOISE];

const effectModules: ModuleType[] = [
	ModuleType.GAIN,
	ModuleType.DELAY,
	ModuleType.FILTER,
	ModuleType.LIMITER,
	ModuleType.COMPRESSOR,
	ModuleType.PAN,
];

const utilModules = (): ModuleType[] =>
	midi.initialized
		? [
				ModuleType.CLOCK,
				ModuleType.ENVELOPE,
				ModuleType.VCA,
				ModuleType.SEQUENCER,
				ModuleType.SHIFT,
				ModuleType.SCOPE,
				ModuleType.MIDI_CC,
				ModuleType.MIDI_CLOCK,
				ModuleType.MIDI_TRIGGER,
		  ]
		: [
				ModuleType.CLOCK,
				ModuleType.ENVELOPE,
				ModuleType.VCA,
				ModuleType.SEQUENCER,
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

	const handleBlur = useCallback(() => {
		dispatch(patchActions.deselectAllModulesAction());
	}, [dispatch]);

	return (
		<select
			id="add-module"
			value=""
			autoFocus
			onKeyDown={(e: any) => {
				if (e.key.toLowerCase() === Key.ESCAPE) {
					dispatch(patchActions.deselectAllModulesAction());
				}
			}}
			onMouseDown={(e: any) => e.stopPropagation()}
			onChange={handleAddModule}
			onBlur={handleBlur}
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
