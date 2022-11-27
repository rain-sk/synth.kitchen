import { dragModulesAction, IDragModules } from './drag-modules';
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
	| IDragModules
	| IKeyboardEvent
	| ILoadPatch
	| ISelectionDrag
	| ISelectModule
	| IUpdateModulePosition
	| IUpdateModuleState;

export const actions = {
	deselectModuleAction,
	dragModulesAction,
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
