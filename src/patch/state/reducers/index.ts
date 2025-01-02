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

export const patchReducers = {
	addModule,
	cancelLoadFromCloud,
	changeName,
	disableKeyMovement,
	enableKeyMovement,
	keyboardEvent,
	loadFromCloud,
	loadPatch,
	selectionDrag,
	selectModule,
	updateModule,
	updateModulePosition,
};
