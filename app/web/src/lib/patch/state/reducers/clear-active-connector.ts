import { IClearActiveConnector } from '../actions/clear-active-connector';
import { IPatchState } from '../types/patch';

export const clearActiveConnector: React.Reducer<
	IPatchState,
	IClearActiveConnector
> = (state) => ({
	...state,
	activeConnectorKey: undefined,
});
