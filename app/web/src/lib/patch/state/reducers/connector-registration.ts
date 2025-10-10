import isCallable from 'is-callable';
import { IRegisterConnector } from '../actions/connector-registration';
import { connectorKey } from '../connection';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';
import { audioContext } from '../../audio';

export const registerConnector: React.Reducer<
	IPatchState,
	IRegisterConnector
> = (state, action) => {
	const accessorValue = isCallable(action.payload.accessor)
		? action.payload.accessor()
		: undefined;

	const accessorValueIsParam =
		accessorValue &&
		'value' in accessorValue &&
		typeof accessorValue.value === 'number' &&
		'setValueAtTime' in accessorValue &&
		typeof accessorValue.setValueAtTime === 'function';

	const accessorValueIsNode =
		accessorValue &&
		'context' in accessorValue &&
		accessorValue.context === audioContext.current;

	if (!accessorValueIsParam && !accessorValueIsNode) {
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
