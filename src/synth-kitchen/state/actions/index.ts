import { addModuleAction, IAddModule } from './add-module';
import { changeNameAction, IChangeName } from './change-name';
import {
	IDisableKeyMovement,
	disableKeyMovementAction
} from './disable-key-movement';
import { dragModulesAction, IDragModules } from './drag-modules';
import {
	IEnableKeyMovement,
	enableKeyMovementAction
} from './enable-key-movement';
import {
	historyPushAction,
	historyRedoAction,
	historyUndoAction,
	IHistory
} from './history';
import { IKeyboardEvent, keyDownAction, keyUpAction } from './keyboard-event';
import { ILoadPatch, loadPatchAction } from './load-patch';
import {
	IRegisterIo,
	registerInputAction,
	registerOutputAction
} from './register-io';
import {
	IRegisterParameter,
	registerParameterAction
} from './register-parameter';
import {
	deselectModuleAction,
	ISelectModule,
	selectModuleAction,
	selectSingleModuleAction
} from './select-module';
import {
	ISelectionDrag,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction
} from './selection-drag';
import {
	IUnregisterParameter,
	unregisterParameterAction
} from './unregister-parameter';
import {
	IUpdateParameterRegistration,
	updateParameterRegistrationAction
} from './update-parameter-registration';
import {
	IUpdateModulePosition,
	updateModulePositionAction
} from './update-module-position';
import {
	IUpdateModuleState,
	updateModuleStateAction
} from './update-module-state';
import {
	IUnregisterIo,
	unregisterInputAction,
	unregisterOutputAction
} from './unregister-io';
import {
	IUpdateIoRegistration,
	updateInputRegistrationAction,
	updateOutputRegistrationAction
} from './update-io-registration';

export type IAction =
	| IAddModule
	| IChangeName
	| IDisableKeyMovement
	| IDragModules
	| IEnableKeyMovement
	| IHistory
	| IKeyboardEvent
	| ILoadPatch
	| IRegisterIo
	| IRegisterParameter
	| ISelectionDrag
	| ISelectModule
	| IUnregisterIo
	| IUnregisterParameter
	| IUpdateIoRegistration
	| IUpdateModulePosition
	| IUpdateModuleState
	| IUpdateParameterRegistration;

export const actions = {
	addModuleAction,
	changeNameAction,
	deselectModuleAction,
	disableKeyMovementAction,
	dragModulesAction,
	enableKeyMovementAction,
	historyPushAction,
	historyRedoAction,
	historyUndoAction,
	keyDownAction,
	keyUpAction,
	loadPatchAction,
	registerInputAction,
	registerOutputAction,
	registerParameterAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	unregisterInputAction,
	unregisterOutputAction,
	unregisterParameterAction,
	updateInputRegistrationAction,
	updateModulePositionAction,
	updateModuleStateAction,
	updateOutputRegistrationAction,
	updateParameterRegistrationAction
};
