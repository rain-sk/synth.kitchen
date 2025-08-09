import { IChangeName } from '../actions/change-name';
import { IPatchState } from '../types/patch';

export const changeName: React.Reducer<IPatchState, IChangeName> = (
	state,
	action,
) => ({
	...state,
	name: action.payload.name,
});
