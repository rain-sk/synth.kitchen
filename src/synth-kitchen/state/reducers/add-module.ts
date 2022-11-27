import { IAddModule } from '../actions/add-module';
import { IState } from '../types/state';
import { randomName } from '../../utils/random-name';
import { randomId } from '../../utils/random-id';

export const addModule: React.Reducer<IState, IAddModule> = (state, action) => {
	const moduleKey = randomId();

	return {
		...state,
		modules: {
			...state.modules,
			[moduleKey]: {
				name: randomName(action.payload.type.toLocaleLowerCase()),
				moduleKey,
				type: action.payload.type,
				x: Math.round(Math.random() * 800),
				y: Math.round(Math.random() * 400),
				width: 200,
				height: 200
			}
		}
	};
};
