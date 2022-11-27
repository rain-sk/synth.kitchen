import { addModule } from './add-module';
import { changeName } from './change-name';
import { dragModules } from './drag-modules';
import { history } from './history';
import { keyboardEvent } from './keyboard-event';
import { loadPatch } from './load-patch';
import { selectionDrag } from './selection-drag';
import { selectModule } from './select-module';
import { updateModulePosition } from './update-module-position';
import { updateModuleState } from './update-module-state';

export const reducers = {
	addModule,
	changeName,
	dragModules,
	history,
	keyboardEvent,
	loadPatch,
	selectionDrag,
	selectModule,
	updateModulePosition,
	updateModuleState
};
