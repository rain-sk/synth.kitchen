import { IRegisterInput } from '../actions/register-input';
import { IState } from '../types/state';

export const registerInput: React.Reducer<IState, IRegisterInput> = (
	state,
	action
) => ({
	...state,
	inputs: {
		...state.inputs,
		[action.payload.moduleKey]:
			action.payload.moduleKey in state.inputs
				? {
						...state.inputs[action.payload.moduleKey],
						[action.payload.channel]: action.payload
				  }
				: { [action.payload.channel]: action.payload }
	}
});
