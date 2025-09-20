import { randomId, randomName } from 'synth.kitchen-shared';

import { IPatchState, cloneAndApply } from '../types/patch';
import { IAddModule } from '../actions/add-module';

export const addModule: React.Reducer<IPatchState, IAddModule> = (
	state,
	action,
) => {
	const moduleKey = randomId();

	const position = action.payload.position;
	const x = position[0];
	const y = position[1];

	return cloneAndApply(state, {
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
	});
};
