import { IDragModules } from '../actions/drag-modules';
import { IState } from '../types/state';

export const dragModules: React.Reducer<IState, IDragModules> = (
	state,
	action
) => ({
	...state,
	...action.payload
});
