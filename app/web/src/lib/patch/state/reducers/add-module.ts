import { randomId, randomName } from 'synth.kitchen-shared';

import { IPatchState } from '../types/patch';
import { IAddModule } from '../actions/add-module';
import { convertRemToPixels } from '../../../shared/utils/rem-to-px';

export const addModule: React.Reducer<IPatchState, IAddModule> = (
	state,
	action,
) => {
	const moduleKey = randomId();

	const position = action.payload.position;
	const x = position[0]; // - convertRemToPixels(2.5);
	const y = position[1]; //- convertRemToPixels(1);

	return {
		...state,
		modules: {
			...state.modules,
			[moduleKey]: {
				name: randomName(action.payload.type.toLocaleLowerCase()),
				moduleKey,
				type: action.payload.type,
			},
		},
		modulePositions: {
			...state.modulePositions,
			[moduleKey]: [x, y],
		},
	};
};
