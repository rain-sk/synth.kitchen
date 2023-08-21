import { IRegisterParameter } from '../actions/register-parameter';
import { paramKey } from '../types/parameter';
import { IState } from '../types/state';

export const registerParameter: React.Reducer<IState, IRegisterParameter> = (
	state,
	action
) => ({
	...state,
	parameters: {
		...state.parameters,
		[paramKey(action.payload)]: action.payload
	}
});
