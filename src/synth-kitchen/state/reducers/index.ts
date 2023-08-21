import { addModule } from './add-module';
import { changeName } from './change-name';
import { disableKeyMovement } from './disable-key-movement';
import { dragModules } from './drag-modules';
import { enableKeyMovement } from './enable-key-movement';
import { history } from './history';
import { keyboardEvent } from './keyboard-event';
import { loadPatch } from './load-patch';
import { registerIo } from './register-io';
import { registerParameter } from './register-parameter';
import { selectionDrag } from './selection-drag';
import { selectModule } from './select-module';
import { unregisterIo } from './unregister-io';
import { unregisterParameter } from './unregister-parameter';
import { updateIoRegistration } from './update-io-registration';
import { updateModulePosition } from './update-module-position';
import { updateModuleState } from './update-module-state';
import { updateParameterRegistration } from './update-parameter-registration';

export const reducers = {
	addModule,
	changeName,
	disableKeyMovement,
	dragModules,
	enableKeyMovement,
	history,
	keyboardEvent,
	loadPatch,
	registerIo,
	registerParameter,
	selectionDrag,
	selectModule,
	unregisterIo,
	unregisterParameter,
	updateIoRegistration,
	updateModulePosition,
	updateModuleState,
	updateParameterRegistration
};
