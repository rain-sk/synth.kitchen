import { connectorKey } from 'synth.kitchen-shared';
import { IRegisterConnector } from '../actions/connector-registration';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';

export const registerConnector: React.Reducer<
	IPatchState,
	IRegisterConnector
> = (state, action) => {
	if (
		!('accessor' in action.payload) ||
		typeof action.payload.accessor !== 'function'
	) {
		throw Error('registering a connector without a valid accessor');
	}

	const key = connectorKey(action.payload);
	const connections = key in state.connectors ? state.connectors[key][1] : [];
	return cloneAndApply(state, {
		connectors: {
			...state.connectors,
			[key]: [action.payload, connections],
		},
	});
};
