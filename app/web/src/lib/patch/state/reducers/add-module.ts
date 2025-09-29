import { randomId } from 'synth.kitchen-shared';

import { IPatchState, cloneAndApplyWithHistory } from '../types/patch';
import { IAddModule } from '../actions/add-module';
import { blockHistory } from './history';

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

	return blockHistory(
		cloneAndApplyWithHistory(state, {
			modules: {
				...state.modules,
				[id]: {
					id,
					type: action.payload.type,
				} as any,
			},
			modulePositions: {
				...state.modulePositions,
				[id]: [x, y],
			},
		}),
	);
};
