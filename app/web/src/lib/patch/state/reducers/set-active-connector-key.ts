import { ISetActiveConnectorKey } from '../actions/set-active-connector-key';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const setActiveConnectorKey: React.Reducer<
	IPatchState,
	ISetActiveConnectorKey
> = (state, action) =>
	cloneAndApply(state, {
		activeConnectorKey: action.payload,
	});