import { IDisableKeyMovement } from '../actions/disable-key-movement';
import { IPatchState } from '../types/state';

export const disableKeyMovement: React.Reducer<
	IPatchState,
	IDisableKeyMovement
> = (state, action) => ({
	...state,
	...action.payload,
});
