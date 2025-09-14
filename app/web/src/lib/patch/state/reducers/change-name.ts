import { IPatchState } from '../types/patch';
import { IChangeName } from '../actions/change-name';
import { cloneAndApply } from '../utils/clone-and-apply';

export const changeName: React.Reducer<IPatchState, IChangeName> = (
	state,
	action,
) => cloneAndApply(state, { name: action.payload.name });
