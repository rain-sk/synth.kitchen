import { ICancelLoadFromCloud } from '../actions/cancel-load-from-cloud';
import { IPatchState } from '../types/patch';

export const cancelLoadFromCloud: React.Reducer<
	IPatchState,
	ICancelLoadFromCloud
> = (state) => ({
	...state,
	loadingFromCloud: false,
});
