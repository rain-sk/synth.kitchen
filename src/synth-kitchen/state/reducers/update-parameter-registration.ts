import { IUpdateParameterRegistration } from '../actions/update-parameter-registration';
import { paramKey } from '../types/parameter';
import { IState } from '../types/state';

export const updateParameterRegistration: React.Reducer<
	IState,
	IUpdateParameterRegistration
> = (state, action) => ({
	...state,
	parameters: {
		...state.parameters,
		[paramKey(action.payload)]: action.payload
	}
});
