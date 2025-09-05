import { IPatchState } from '../types/patch';
import { IChangeName } from '../actions/change-name';

export const changeName: React.Reducer<IPatchState, IChangeName> = (
	state,
	action,
) => ({
	...state,
	name: action.payload.name,
});
