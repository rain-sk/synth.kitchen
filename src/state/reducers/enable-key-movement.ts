import { IEnableKeyMovement } from '../actions/enable-key-movement';
import { IState } from '../types/state';

export const enableKeyMovement: React.Reducer<IState, IEnableKeyMovement> = (
	state,
	action
) => ({
	...state,
	...action.payload
});
