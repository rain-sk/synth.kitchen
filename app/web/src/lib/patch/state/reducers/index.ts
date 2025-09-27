import { IPatchAction } from '../actions';
import { cloneAndApply, IPatchState } from '../types/patch';
import { addModule } from './add-module';
import { cancelLoadFromCloud } from './cancel-load-from-cloud';
import { changeName } from './change-name';
import { clearActiveConnector } from './clear-active-connector';
import { clearPatchEditor } from './clear-patch-editor';
import { clickConnector } from './click-connector';
import { registerConnector } from './connector-registration';
import { blurInput } from './input-blur';
import { focusInput } from './input-focus';
import { keyboardEvent } from './keyboard-event';
import { loadConnections } from './load-connections';
import { loadPatch } from './load-patch';
import { selectModule } from './select-module';
import { selectionDrag } from './selection-drag';
import { setActiveConnectorKey } from './set-active-connector-key';
import { updateModuleName } from './update-module-name';
import { updateModulePosition } from './update-module-position';
import { updateModuleState } from './update-module-state';

export const patchReducer: React.Reducer<IPatchState, IPatchAction> = (
	state,
	action,
): IPatchState => {
	if (action === state.asyncActionQueue[0]) {
		state = cloneAndApply(state, {
			asyncActionQueue: state.asyncActionQueue.slice(1),
		});
	}

	switch (action.type) {
		case 'AddModule': {
			return addModule(state, action);
		}
		case 'CancelLoadFromCloud': {
			return cancelLoadFromCloud(state, action);
		}
		case 'ChangeName': {
			return changeName(state, action);
		}
		case 'ClearActiveConnector': {
			return clearActiveConnector(state, action);
		}
		case 'ClearPatchEditor': {
			return clearPatchEditor(state, action);
		}
		case 'ClickConnector': {
			return clickConnector(state, action);
		}
		case 'FocusInput': {
			return focusInput(state, action);
		}
		case 'BlurInput': {
			return blurInput(state, action);
		}
		case 'KeyboardEvent': {
			return keyboardEvent(state, action);
		}
		case 'LoadConnections': {
			return loadConnections(state, action);
		}
		case 'LoadPatch': {
			return loadPatch(state, action);
		}
		case 'RegisterConnector': {
			return registerConnector(state, action);
		}
		case 'SelectionDrag': {
			return selectionDrag(state, action);
		}
		case 'SelectModule': {
			return selectModule(state, action);
		}
		case 'SetActiveConnectorKey': {
			return setActiveConnectorKey(state, action);
		}
		case 'UpdateModuleName': {
			return updateModuleName(state, action);
		}
		case 'UpdateModulePosition': {
			return updateModulePosition(state, action);
		}
		case 'UpdateModuleState': {
			return updateModuleState(state, action);
		}
		default: {
			return state;
		}
	}
};
