import { IState } from '../types/state';
import { ILoadFromCloud } from '../actions/load-from-cloud';

export const loadFromCloud: React.Reducer<IState, ILoadFromCloud> = (
	state,
) => ({
	...state,
	loadingFromCloud: true,
});
