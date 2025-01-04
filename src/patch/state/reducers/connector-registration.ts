import { connectorKey } from '../connection';
import { IPatchState } from '../types/patch';
import { IRegisterConnector } from '../actions/connector-registration';

export const registerConnector: React.Reducer<
	IPatchState,
	IRegisterConnector
> = (state, action) => {
	const key = connectorKey(action.payload);
	return {
		...state,
		connectors: {
			...state.connectors,
			[key]: [action.payload, []],
		},
	};
};
