import { ICancelLoadFromCloud } from '../actions/cancel-load-from-cloud';
import { IPatchState } from '../types/state';

export const cancelLoadFromCloud: React.Reducer<
	IPatchState,
	ICancelLoadFromCloud
> = (state) => ({
	...state,
	loadingFromCloud: false,
});
