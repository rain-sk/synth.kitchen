import { IClearActiveConnector } from '../actions/clear-active-connector';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const clearActiveConnector: React.Reducer<
	IPatchState,
	IClearActiveConnector
> = (state) => cloneAndApply(state, { activeConnectorKey: undefined });
