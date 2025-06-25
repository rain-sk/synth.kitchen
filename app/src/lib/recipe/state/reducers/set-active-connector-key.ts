import { ISetActiveConnectorKey } from '../actions/set-active-connector-key';
import { IRecipeState } from '../types/recipe';

export const setActiveConnectorKey: React.Reducer<
	IRecipeState,
	ISetActiveConnectorKey
> = (state, action) => ({
	...state,
	activeConnectorKey: action.payload,
});
