import React, { useCallback, useContext } from 'react';

import { INVALID_POSITION, Position } from '../../state/types/recipe';
import { midi } from '../../midi';
import { ModuleType } from '../../state/types/module';
import { recipeActions } from '../../state/actions';
import { RecipeContext } from '../../contexts/recipe';

const controlModules = (): ModuleType[] =>
	midi.initialized
		? [
				'CLOCK',
				'MIDI_CC',
				'MIDI_CLOCK',
				'MIDI_TRIGGER',
				'GATE',
				'ENVELOPE',
				'SEQUENCER',
		  ]
		: ['CLOCK', 'GATE', 'ENVELOPE', 'SEQUENCER'];

const soundModules: ModuleType[] = ['OSCILLATOR', 'NOISE'];

const effectModules: ModuleType[] = [
	'COMPRESSOR',
	'DELAY',
	'FILTER',
	'LIMITER',
	'VCA',
	'PAN',
];

const utilModules: ModuleType[] = ['GAIN', 'SHIFT'];

export const AddModule: React.FC<{ position?: Position }> = ({ position }) => {
	const { dispatch } = useContext(RecipeContext);

	const handleAddModule = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const moduleType = e.target.value;
			if (moduleType !== '') {
				dispatch(
					recipeActions.addModuleAction(moduleType as ModuleType, position),
				);
			}
		},
		[dispatch, position],
	);

	return (
		<select
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
			<optgroup label="Control">
				{controlModules().map((type) => (
					<option
						key={type}
						value={type}
					>{`${type.toLocaleLowerCase()}`}</option>
				))}
			</optgroup>
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
			<optgroup label="Utils">
				{utilModules.map((type) => (
					<option
						key={type}
						value={type}
					>{`${type.toLocaleLowerCase()}`}</option>
				))}
			</optgroup>
		</select>
	);
};
