import { IEnableKeyMovement } from '../actions/enable-key-movement';
import { IPatchState } from '../types/state';

export const enableKeyMovement: React.Reducer<
	IPatchState,
	IEnableKeyMovement
> = (state, action) => ({
	...state,
	...action.payload,
});
