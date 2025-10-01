import React, { useCallback, useContext } from 'react';
import { ModulePosition, ModuleType } from 'synth.kitchen-shared';

import { midi } from '../../midi';
import { patchActions } from '../../state/actions';
import { PatchContext } from '../../contexts/patch';
import { INVALID_POSITION } from '../../state/constants/positions';

const modules = (): ModuleType[] =>
	midi.initialized
		? [
				ModuleType.CLOCK,
				ModuleType.COMPRESSOR,
				ModuleType.DELAY,
				ModuleType.ENVELOPE,
				ModuleType.FILTER,
				ModuleType.GAIN,
				ModuleType.GATE,
				ModuleType.LIMITER,
				ModuleType.MIDI_CC,
				ModuleType.MIDI_CLOCK,
				ModuleType.MIDI_TRIGGER,
				ModuleType.NOISE,
				ModuleType.OSCILLATOR,
				ModuleType.OUTPUT,
				ModuleType.PAN,
				ModuleType.SCOPE,
				ModuleType.SEQUENCER,
				ModuleType.SHIFT,
				ModuleType.VCA,
		  ]
		: [
				ModuleType.CLOCK,
				ModuleType.COMPRESSOR,
				ModuleType.DELAY,
				ModuleType.ENVELOPE,
				ModuleType.FILTER,
				ModuleType.GAIN,
				ModuleType.GATE,
				ModuleType.LIMITER,
				ModuleType.NOISE,
				ModuleType.OSCILLATOR,
				ModuleType.OUTPUT,
				ModuleType.PAN,
				ModuleType.SCOPE,
				ModuleType.SEQUENCER,
				ModuleType.SHIFT,
				ModuleType.VCA,
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
			{modules().map((type) => (
				<option key={type} value={type}>{`${type.toLocaleLowerCase()}`}</option>
			))}
		</select>
	);
};
