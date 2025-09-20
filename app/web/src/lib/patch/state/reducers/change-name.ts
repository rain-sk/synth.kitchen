import { IChangeName } from '../actions/change-name';
import { cloneAndApply, IPatchState } from '../types/patch';

export const changeName: React.Reducer<IPatchState, IChangeName> = (
	state,
	action,
) => cloneAndApply(state, { name: action.payload.name });
