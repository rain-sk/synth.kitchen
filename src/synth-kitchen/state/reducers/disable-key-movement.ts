import { IDisableKeyMovement } from '../actions/disable-key-movement';
import { IState } from '../types/state';

export const disableKeyMovement: React.Reducer<IState, IDisableKeyMovement> = (
	state,
	action
) => ({
	...state,
	...action.payload
});
