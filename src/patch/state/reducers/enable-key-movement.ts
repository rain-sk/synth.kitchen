import { IEnableKeyMovement } from '../actions/enable-key-movement';
import { IPatchState } from '../types/patch';

export const enableKeyMovement: React.Reducer<
	IPatchState,
	IEnableKeyMovement
> = (state, action) => ({
	...state,
	...action.payload,
});
