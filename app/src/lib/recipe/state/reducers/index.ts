import { IRecipeState } from '../types/recipe';
import { IRecipeAction } from '../actions';

import { addModule } from './add-module';
import { cancelLoadFromCloud } from './cancel-load-from-cloud';
import { changeName } from './change-name';
import { keyboardEvent } from './keyboard-event';
import { loadRecipe } from './load-recipe';
import { selectionDrag } from './selection-drag';
import { selectModule } from './select-module';
import { updateModule } from './update-module';
import { updateModulePosition } from './update-module-position';
import { setActiveConnectorKey } from './set-active-connector-key';
import { registerConnector } from './connector-registration';
import { clickConnector } from './click-connector';
import { loadConnections } from './load-connections';
import { focusInput } from './input-focus';
import { blurInput } from './input-blur';

export const reducer: React.Reducer<IRecipeState, IRecipeAction> = (
	state,
	action,
) => {
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
		case 'LoadRecipe': {
			return loadRecipe(state, action);
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
};
