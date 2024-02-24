import { IState } from '../types/state';
import { IUpdateModuleState } from '../actions/update-module-state';
import { reducers } from '.';
import { actions } from '../actions';

export const updateModuleState: React.Reducer<IState, IUpdateModuleState> = (
	state,
	action
) =>
	reducers.history(
		{
			...state,
			modules: {
				...state.modules,
				[action.payload.moduleKey]: {
					...state.modules[action.payload.moduleKey],
					state: action.payload.state
				}
			}
		},
		actions.historyPushAction()
	);
