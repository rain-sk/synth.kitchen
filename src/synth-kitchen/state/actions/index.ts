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
import {
	IUpdateModuleState,
	updateModuleStateAction
} from './update-module-state';

export type IAction =
	| IAddModule
	| IChangeName
	| IDisableKeyMovement
	| IDragModules
	| IEnableKeyMovement
	| IHistory
	| IKeyboardEvent
	| ILoadPatch
	| ISelectionDrag
	| ISelectModule
	| IUpdateModulePosition
	| IUpdateModuleState;

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
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	updateModulePositionAction,
	updateModuleStateAction
};
