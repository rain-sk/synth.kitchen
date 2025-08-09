import { randomId, randomName } from 'shared';

import { IAddModule } from '../actions/add-module';
import { IPatchState } from '../types/patch';

export const addModule: React.Reducer<IPatchState, IAddModule> = (
	state,
	action,
) => {
	const moduleKey = randomId();

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
			[moduleKey]: action.payload.position
				? action.payload.position
				: [Math.round(Math.random() * 800), Math.round(Math.random() * 400)],
		},
	};
};
