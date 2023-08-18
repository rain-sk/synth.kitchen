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
import { IRegisterInput, registerInputAction } from './register-input';
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
import { IUnregisterInput, unregisterInputAction } from './unregister-input';
import {
	IUpdateInputRegistration,
	updateInputRegistrationAction
} from './update-input-registration';

export type IAction =
	| IAddModule
	| IChangeName
	| IDisableKeyMovement
	| IDragModules
	| IEnableKeyMovement
	| IHistory
	| IKeyboardEvent
	| ILoadPatch
	| IRegisterInput
	| IRegisterParameter
	| ISelectionDrag
	| ISelectModule
	| IUnregisterInput
	| IUnregisterParameter
	| IUpdateInputRegistration
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
	registerParameterAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	unregisterInputAction,
	unregisterParameterAction,
	updateInputRegistrationAction,
	updateModulePositionAction,
	updateModuleStateAction,
	updateParameterRegistrationAction
};
