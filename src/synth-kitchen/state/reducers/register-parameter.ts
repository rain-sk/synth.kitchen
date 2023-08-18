import { IRegisterParameter } from '../actions/register-parameter';
import { IState } from '../types/state';

import { paramId } from '../../utils/param-id';

export const registerParameter: React.Reducer<IState, IRegisterParameter> = (
	state,
	action
) => ({
	...state,
	parameters: {
		...state.parameters,
		[paramId(action.payload)]: action.payload
	}
});
