import { keyboardEvent } from './keyboard-event';
import { loadPatch } from './load-patch';
import { selectionDrag } from './selection-drag';
import { selectModule } from './select-module';
import { updateModulePosition } from './update-module-position';
import { updateModuleState } from './update-module-state';

export const reducers = {
	keyboardEvent,
	loadPatch,
	selectionDrag,
	selectModule,
	updateModulePosition,
	updateModuleState
};
