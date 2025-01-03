import { connectorInfo, connectorKey } from '../connection';
import { IPatchState } from '../types/patch';
import {
	IRegisterConnector,
	IUnregisterConnector,
} from '../actions/connector-registration';

export const registerConnector: React.Reducer<
	IPatchState,
	IRegisterConnector
> = (state, action) => {
	const key = connectorKey(action.payload);
	return {
		...state,
		moduleConnectors: {
			...state.moduleConnectors,
			[action.payload.moduleKey]:
				action.payload.moduleKey in state.moduleConnectors
					? new Set([...state.moduleConnectors[action.payload.moduleKey], key])
					: new Set([key]),
		},
		connectors: {
			...state.connectors,
			[key]: [action.payload, new Set<string>()],
		},
	};
};

export const unregisterConnector: React.Reducer<
	IPatchState,
	IUnregisterConnector
> = (state, action) => {
	const key = connectorKey(action.payload);
	const [, connections] = connectorInfo(state.connectors, key);

	if (connections.size > 0) {
		throw Error(
			'Failed to clean up connections before unregistering a connector',
		);
	}

	const moduleConnectors = {
		...state.moduleConnectors,
		[action.payload.moduleKey]: new Set(
			[...state.moduleConnectors[action.payload.moduleKey]].filter(
				(existingKey) => existingKey !== key,
			),
		),
	};
	if (moduleConnectors[action.payload.moduleKey].size === 0) {
		delete moduleConnectors[action.payload.moduleKey];
	}

	return {
		...state,
		moduleConnectors,
		connectors: Object.fromEntries(
			Object.entries(state.connectors).filter(
				([existingKey]) => existingKey !== key,
			),
		),
	};
};
