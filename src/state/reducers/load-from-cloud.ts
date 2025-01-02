import { IPatchState } from '../types/state';
import { ILoadFromCloud } from '../actions/load-from-cloud';

export const loadFromCloud: React.Reducer<IPatchState, ILoadFromCloud> = (
	state,
) => ({
	...state,
	loadingFromCloud: true,
});
