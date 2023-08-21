import { IUpdateIoRegistration } from '../actions/update-io-registration';
import { IState } from '../types/state';

export const updateIoRegistration: React.Reducer<
	IState,
	IUpdateIoRegistration
> = (state, action) => ({
	...state,
	inputs: {
		...state.io,
		[action.payload.moduleKey]: {
			...state.io[action.payload.moduleKey],
			[action.payload.channel]: action.payload
		}
	}
});
