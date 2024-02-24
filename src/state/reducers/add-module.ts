import { IAddModule } from '../actions/add-module';
import { IState } from '../types/state';
import { randomName } from '../../utils/random-name';
import { randomId } from '../../utils/random-id';
import { reducers } from '.';
import { actions } from '../actions';

export const addModule: React.Reducer<IState, IAddModule> = (state, action) => {
	const moduleKey = randomId();

	state = reducers.history(state, actions.historyPushAction());

	return {
		...state,
		modules: {
			...state.modules,
			[moduleKey]: {
				name: randomName(action.payload.type.toLocaleLowerCase()),
				moduleKey,
				type: action.payload.type
			}
		},
		modulePositions: {
			...state.modulePositions,
			[moduleKey]: action.payload.position
				? action.payload.position
				: [Math.round(Math.random() * 800), Math.round(Math.random() * 400)]
		}
	};
};
