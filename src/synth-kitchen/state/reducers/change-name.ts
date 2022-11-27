import { IChangeName } from '../actions/change-name';
import { IState } from '../types/state';

export const changeName: React.Reducer<IState, IChangeName> = (
	state,
	action
) => ({
	...state,
	name: action.payload.name
});
