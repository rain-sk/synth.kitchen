import { IUpdateParameterRegistration } from '../actions/update-parameter-registration';
import { IState } from '../types/state';

import { paramId } from '../../utils/param-id';

export const updateParameterRegistration: React.Reducer<
	IState,
	IUpdateParameterRegistration
> = (state, action) => ({
	...state,
	parameters: {
		...state.parameters,
		[paramId(action.payload)]: action.payload
	}
});
