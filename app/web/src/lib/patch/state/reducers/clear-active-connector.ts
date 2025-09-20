import { IClearActiveConnector } from '../actions/clear-active-connector';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const clearActiveConnector: React.Reducer<
	IPatchState,
	IClearActiveConnector
> = (state) => cloneAndApply(state, { activeConnectorKey: undefined });