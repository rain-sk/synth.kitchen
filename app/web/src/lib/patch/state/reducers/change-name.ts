import { IChangeName } from '../actions/change-name';
import { cloneAndApplyWithHistory, IPatchState } from '../types/patch';

export const changeName: React.Reducer<IPatchState, IChangeName> = (
	state,
	action,
) => cloneAndApplyWithHistory(state, { name: action.payload.name });
