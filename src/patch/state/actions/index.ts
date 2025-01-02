import { addModuleAction, IAddModule } from './add-module';
import { changeNameAction, IChangeName } from './change-name';
import {
	IDisableKeyMovement,
	disableKeyMovementAction,
} from './disable-key-movement';
import {
	IEnableKeyMovement,
	enableKeyMovementAction,
} from './enable-key-movement';
import { IKeyboardEvent, keyDownAction, keyUpAction } from './keyboard-event';
import { ILoadPatch, loadPatchAction } from './load-patch';
import {
	deselectAllModulesAction,
	deselectModuleAction,
	ISelectModule,
	selectModuleAction,
	selectSingleModuleAction,
} from './select-module';
import {
	ISelectionDrag,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
} from './selection-drag';
import {
	IUpdateModulePosition,
	updateModulePositionAction,
} from './update-module-position';
import { IUpdateModule, updateModuleAction } from './update-module';
import { ILoadFromCloud, loadFromCloudAction } from './load-from-cloud';
import {
	cancelLoadFromCloudAction,
	ICancelLoadFromCloud,
} from './cancel-load-from-cloud';

export type IPatchAction =
	| IAddModule
	| ICancelLoadFromCloud
	| IChangeName
	| IDisableKeyMovement
	| IEnableKeyMovement
	| IKeyboardEvent
	| ILoadFromCloud
	| ILoadPatch
	| ISelectionDrag
	| ISelectModule
	| IUpdateModulePosition
	| IUpdateModule;

export const patchActions = {
	addModuleAction,
	cancelLoadFromCloudAction,
	changeNameAction,
	deselectAllModulesAction,
	deselectModuleAction,
	disableKeyMovementAction,
	enableKeyMovementAction,
	keyDownAction,
	keyUpAction,
	loadFromCloudAction,
	loadPatchAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	updateModulePositionAction,
	updateModuleAction,
};
