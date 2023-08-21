import { IRegisterIo } from '../actions/register-io';
import { IState } from '../types/state';

export const registerIo: React.Reducer<IState, IRegisterIo> = (
	state,
	action
) => ({
	...state,
	inputs: {
		...state.io,
		[action.payload.moduleKey]:
			action.payload.moduleKey in state.io
				? {
						...state.io[action.payload.moduleKey],
						[action.payload.channel]: action.payload
				  }
				: { [action.payload.channel]: action.payload }
	}
});
