import { ISetActiveConnectorKey } from '../actions/set-active-connector-key';
import { IPatchState } from '../types/patch';

export const setActiveConnectorKey: React.Reducer<
	IPatchState,
	ISetActiveConnectorKey
> = (state, action) => ({
	...state,
	activeConnectorKey: action.payload,
});
