import { ICancelLoadFromCloud } from '../actions/cancel-load-from-cloud';
import { IState } from '../types/state';

export const cancelLoadFromCloud: React.Reducer<
	IState,
	ICancelLoadFromCloud
> = (state) => ({
	...state,
	loadingFromCloud: false,
});
