import { IPatchState } from '../types/patch';
import { IPatchAction } from '../actions';

import { addModule } from './add-module';
import { cancelLoadFromCloud } from './cancel-load-from-cloud';
import { changeName } from './change-name';
import { disableKeyMovement } from './disable-key-movement';
import { enableKeyMovement } from './enable-key-movement';
import { keyboardEvent } from './keyboard-event';
import { loadFromCloud } from './load-from-cloud';
import { loadPatch } from './load-patch';
import { selectionDrag } from './selection-drag';
import { selectModule } from './select-module';
import { updateModule } from './update-module';
import { updateModulePosition } from './update-module-position';
import { setActiveConnectorKey } from './set-active-connector-key';

export const reducer: React.Reducer<IPatchState, IPatchAction> = (
	state,
	action,
) =>
	(() => {
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
			case 'DisableKeyMovement': {
				return disableKeyMovement(state, action);
			}
			case 'EnableKeyMovement': {
				return enableKeyMovement(state, action);
			}
			case 'KeyboardEvent': {
				return keyboardEvent(state, action);
			}
			case 'LoadFromCloud': {
				return loadFromCloud(state, action);
			}
			case 'LoadPatch': {
				return loadPatch(state, action);
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
			case 'UpdateModulePosition': {
				return updateModulePosition(state, action);
			}
			case 'UpdateModule': {
				return updateModule(state, action);
			}
			default: {
				return state;
			}
		}
	})();
