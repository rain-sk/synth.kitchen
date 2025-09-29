import { defaultModuleState, randomId } from 'synth.kitchen-shared';

import { IPatchState, cloneAndApplyWithHistory } from '../types/patch';
import { IAddModule } from '../actions/add-module';

export const addModule: React.Reducer<IPatchState, IAddModule> = (
	state,
	action,
) => {
	const id = action.payload.options?.id
		? action.payload.options.id
		: randomId();

	const position = action.payload.position;
	const x = position[0];
	const y = position[1];

	return cloneAndApplyWithHistory(state, {
		modules: {
			...state.modules,
			[id]: {
				id,
				type: action.payload.type,
				state: defaultModuleState(action.payload.type),
			},
		},
		modulePositions: {
			...state.modulePositions,
			[id]: [x, y],
		},
	});
};
