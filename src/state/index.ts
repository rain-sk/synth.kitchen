import React from 'react';
import { IAction } from './actions';
import { reducers } from './reducers';
import { IState } from './types/state';

export const reducer: React.Reducer<IState, IAction> = (state, action) =>
	(() => {
		switch (action.type) {
			case 'AddModule': {
				return reducers.addModule(state, action);
			}
			case 'CancelLoadFromCloud': {
				return reducers.cancelLoadFromCloud(state, action);
			}
			case 'ChangeName': {
				return reducers.changeName(state, action);
			}
			case 'DisableKeyMovement': {
				return reducers.disableKeyMovement(state, action);
			}
			case 'EnableKeyMovement': {
				return reducers.enableKeyMovement(state, action);
			}
			case 'KeyboardEvent': {
				return reducers.keyboardEvent(state, action);
			}
			case 'LoadFromCloud': {
				return reducers.loadFromCloud(state, action);
			}
			case 'LoadPatch': {
				return reducers.loadPatch(state, action);
			}
			case 'SelectionDrag': {
				return reducers.selectionDrag(state, action);
			}
			case 'SelectModule': {
				return reducers.selectModule(state, action);
			}
			case 'UpdateModulePosition': {
				return reducers.updateModulePosition(state, action);
			}
			case 'UpdateModule': {
				return reducers.updateModule(state, action);
			}
			default: {
				return state;
			}
		}
	})();
