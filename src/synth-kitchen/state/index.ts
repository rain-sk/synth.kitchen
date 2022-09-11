import React, { useContext } from 'react';

import { IAction } from './actions';
import { reducers } from './reducers';
import { IState } from './types/state';

export const reducer = (state: IState, action: IAction) => {
	const newState = (() => {
		switch (action.type) {
			case 'SelectionDrag': {
				return reducers.selectionDrag(state, action);
			}
			case 'UpdateModulePosition': {
				return reducers.updateModulePosition(state, action);
			}
			case 'UpdateModuleState': {
				return reducers.updateModuleState(state, action);
			}
			default: {
				return state;
			}
		}
	})();
	console.log(newState);
	return newState;
};

export const DispatchContext = React.createContext<React.Dispatch<IAction>>(
	() => {}
);

export const useDispatch = () => {
	return useContext(DispatchContext);
};
