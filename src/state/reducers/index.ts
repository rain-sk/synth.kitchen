import { addModule } from './add-module';
import { changeName } from './change-name';
import { disableKeyMovement } from './disable-key-movement';
import { enableKeyMovement } from './enable-key-movement';
import { keyboardEvent } from './keyboard-event';
import { loadPatch } from './load-patch';
import { selectionDrag } from './selection-drag';
import { selectModule } from './select-module';
import { updateModulePosition } from './update-module-position';
import { updateModuleState } from './update-module-state';

export const reducers = {
	addModule,
	changeName,
	disableKeyMovement,
	enableKeyMovement,
	keyboardEvent,
	loadPatch,
	selectionDrag,
	selectModule,
	updateModulePosition,
	updateModuleState
};
