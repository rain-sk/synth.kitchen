import { IUpdateInputRegistration } from '../actions/update-input-registration';
import { IState } from '../types/state';

export const updateInputRegistration: React.Reducer<
	IState,
	IUpdateInputRegistration
> = (state, action) => ({
	...state,
	inputs: {
		...state.inputs,
		[action.payload.moduleKey]: {
			...state.inputs[action.payload.moduleKey],
			[action.payload.channel]: action.payload
		}
	}
});
