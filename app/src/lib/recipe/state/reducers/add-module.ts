import { IAddModule } from '../actions/add-module';
import { IRecipeState } from '../types/recipe';
import { randomName } from '../../../../utils/randomName';
import { randomId } from '../../../../utils/randomId';

export const addModule: React.Reducer<IRecipeState, IAddModule> = (
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
