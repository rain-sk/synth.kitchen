import { ISetActiveConnectorKey } from '../actions/set-active-connector-key';
import { IPatchState } from '../types/patch';
import { cloneAndApply } from '../utils/clone-and-apply';

export const setActiveConnectorKey: React.Reducer<
	IPatchState,
	ISetActiveConnectorKey
> = (state, action) =>
	cloneAndApply(state, {
		activeConnectorKey: action.payload,
	});
