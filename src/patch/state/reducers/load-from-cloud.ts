import { IPatchState } from '../types/patch';
import { ILoadFromCloud } from '../actions/load-from-cloud';

export const loadFromCloud: React.Reducer<IPatchState, ILoadFromCloud> = (
	state,
) => ({
	...state,
	loadingFromCloud: true,
});
