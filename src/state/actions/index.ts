import { addModuleAction, IAddModule } from './add-module';
import { changeNameAction, IChangeName } from './change-name';
import {
	IDisableKeyMovement,
	disableKeyMovementAction
} from './disable-key-movement';
import {
	IEnableKeyMovement,
	enableKeyMovementAction
} from './enable-key-movement';
import { IKeyboardEvent, keyDownAction, keyUpAction } from './keyboard-event';
import { ILoadPatch, loadPatchAction } from './load-patch';
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
	IUpdateModulePosition,
	updateModulePositionAction
} from './update-module-position';
import { IUpdateModule, updateModuleAction } from './update-module';

export type IAction =
	| IAddModule
	| IChangeName
	| IDisableKeyMovement
	| IEnableKeyMovement
	| IKeyboardEvent
	| ILoadPatch
	| ISelectionDrag
	| ISelectModule
	| IUpdateModulePosition
	| IUpdateModule;

export const actions = {
	addModuleAction,
	changeNameAction,
	deselectModuleAction,
	disableKeyMovementAction,
	enableKeyMovementAction,
	keyDownAction,
	keyUpAction,
	loadPatchAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	updateModulePositionAction,
	updateModuleAction
};
