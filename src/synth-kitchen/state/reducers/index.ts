import { addModule } from './add-module';
import { changeName } from './change-name';
import { disableKeyMovement } from './disable-key-movement';
import { dragModules } from './drag-modules';
import { enableKeyMovement } from './enable-key-movement';
import { history } from './history';
import { keyboardEvent } from './keyboard-event';
import { loadPatch } from './load-patch';
import { registerInput } from './register-input';
import { registerParameter } from './register-parameter';
import { selectionDrag } from './selection-drag';
import { selectModule } from './select-module';
import { unregisterInput } from './unregister-input';
import { unregisterParameter } from './unregister-parameter';
import { updateInputRegistration } from './update-input-registration';
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
	registerInput,
	registerParameter,
	selectionDrag,
	selectModule,
	unregisterInput,
	unregisterParameter,
	updateInputRegistration,
	updateModulePosition,
	updateModuleState,
	updateParameterRegistration
};
