import { IPatchAction } from '../actions';
import { cloneAndApply, IPatchState } from '../types/patch';
import { addModule } from './add-module';
import { cancelLoadFromCloud } from './cancel-load-from-cloud';
import { changeName } from './change-name';
import { clearActiveConnector } from './clear-active-connector';
import { clearPatchEditor } from './clear-patch-editor';
import { clickConnector } from './click-connector';
import { connect, disconnect } from './connection';
import { registerConnector } from './connector-registration';
import { flushAsyncQueue } from './flush-async-queue';
import {
	blockHistory,
	pushToHistory,
	redo,
	unblockHistory,
	undo,
} from './history';
import { blurInput } from './input-blur';
import { focusInput } from './input-focus';
import { keyboardEvent } from './keyboard-event';
import { loadConnections } from './load-connections';
import { loadPatch } from './load-patch';
import { selectModule } from './select-module';
import { selectModules } from './select-modules';
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
	} else if (
		state.asyncActionQueue.length > 0 &&
		action.type !== 'RegisterConnector' &&
		action.type !== 'UpdateModuleState'
	) {
		return cloneAndApply(state, {
			asyncActionQueue: [...state.asyncActionQueue, action],
		});
	}

	switch (action.type) {
		case 'AddModule': {
			return addModule(state, action);
		}
		case 'BlockHistory': {
			return blockHistory(state);
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
		case 'Connect': {
			return connect(state, action);
		}
		case 'FlushAsyncQueue': {
			return flushAsyncQueue(state, patchReducer);
		}
		case 'FocusInput': {
			return focusInput(state, action);
		}
		case 'Disconnect': {
			return disconnect(state, action);
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
		case 'PushToHistory': {
			return pushToHistory(state, action);
		}
		case 'Redo': {
			return redo(state);
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
		case 'SelectModules': {
			return selectModules(state, action);
		}
		case 'SetActiveConnectorKey': {
			return setActiveConnectorKey(state, action);
		}
		case 'UnblockHistory': {
			return unblockHistory(state);
		}
		case 'Undo': {
			return undo(state);
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
