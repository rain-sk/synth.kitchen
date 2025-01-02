import React from 'react';
import { IPatchAction } from './actions';
import { patchReducers } from './reducers';
import { IPatchState } from './types/patch';

export const reducer: React.Reducer<IPatchState, IPatchAction> = (
	state,
	action,
) =>
	(() => {
		switch (action.type) {
			case 'AddModule': {
				return patchReducers.addModule(state, action);
			}
			case 'CancelLoadFromCloud': {
				return patchReducers.cancelLoadFromCloud(state, action);
			}
			case 'ChangeName': {
				return patchReducers.changeName(state, action);
			}
			case 'DisableKeyMovement': {
				return patchReducers.disableKeyMovement(state, action);
			}
			case 'EnableKeyMovement': {
				return patchReducers.enableKeyMovement(state, action);
			}
			case 'KeyboardEvent': {
				return patchReducers.keyboardEvent(state, action);
			}
			case 'LoadFromCloud': {
				return patchReducers.loadFromCloud(state, action);
			}
			case 'LoadPatch': {
				return patchReducers.loadPatch(state, action);
			}
			case 'SelectionDrag': {
				return patchReducers.selectionDrag(state, action);
			}
			case 'SelectModule': {
				return patchReducers.selectModule(state, action);
			}
			case 'UpdateModulePosition': {
				return patchReducers.updateModulePosition(state, action);
			}
			case 'UpdateModule': {
				return patchReducers.updateModule(state, action);
			}
			default: {
				return state;
			}
		}
	})();
