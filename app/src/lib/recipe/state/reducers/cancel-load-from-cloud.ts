import { ICancelLoadFromCloud } from '../actions/cancel-load-from-cloud';
import { IRecipeState } from '../types/recipe';

export const cancelLoadFromCloud: React.Reducer<
	IRecipeState,
	ICancelLoadFromCloud
> = (state) => ({
	...state,
	loadingFromCloud: false,
});
