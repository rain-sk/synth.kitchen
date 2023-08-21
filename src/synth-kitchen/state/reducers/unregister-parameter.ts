import { IUnregisterParameter } from '../actions/unregister-parameter';
import { paramKey } from '../types/parameter';
import { IState } from '../types/state';

export const unregisterParameter: React.Reducer<
	IState,
	IUnregisterParameter
> = (state, action) => {
	const key = paramKey(action.payload);
	return {
		...state,
		parameters: Object.fromEntries(
			Object.entries(state.parameters).filter((entry) => entry[0] != key)
		)
	};
};
