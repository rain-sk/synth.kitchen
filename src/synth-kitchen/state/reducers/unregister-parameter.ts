import { IUnregisterParameter } from '../actions/unregister-parameter';
import { IState } from '../types/state';

import { paramId } from '../../utils/param-id';

export const unregisterParameter: React.Reducer<
	IState,
	IUnregisterParameter
> = (state, action) => {
	const key = paramId(action.payload);
	return {
		...state,
		parameters: Object.fromEntries(
			Object.entries(state.parameters).filter((entry) => entry[0] != key)
		)
	};
};
