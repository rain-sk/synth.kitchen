import { addModuleAction, IAddModule } from './add-module';
import { changeNameAction, IChangeName } from './change-name';
import { clickConnectorAction, IClickConnector } from './click-connector';
import { blurInputAction, IBlurInput } from './input-blur';
import { focusInputAction, IFocusInput } from './input-focus';
import { IKeyboardEvent, keyDownAction, keyUpAction } from './keyboard-event';
import { ILoadConnections, loadConnectionsAction } from './load-connections';
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
	selectionDragCancelAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
} from './selection-drag';
import {
	IUpdateModulePosition,
	updateModulePositionAction,
} from './update-module-position';
import {
	cancelLoadFromCloudAction,
	ICancelLoadFromCloud,
} from './cancel-load-from-cloud';
import {
	ISetActiveConnectorKey,
	setActiveConnectorKeyAction,
} from './set-active-connector-key';
import {
	IRegisterConnector,
	registerConnectorAction,
} from './connector-registration';
import {
	clearPatchEditorAction,
	IClearPatchEditor,
} from './clear-patch-editor';
import {
	clearActiveConnectorAction,
	IClearActiveConnector,
} from './clear-active-connector';
import {
	IUpdateModuleState,
	updateModuleStateAction,
} from './update-module-state';
import {
	IUpdateModuleName,
	updateModuleNameAction,
} from './update-module-name';

export type IPatchAction =
	| IAddModule
	| IBlurInput
	| ICancelLoadFromCloud
	| IChangeName
	| IClearActiveConnector
	| IClearPatchEditor
	| IClickConnector
	| IFocusInput
	| IKeyboardEvent
	| ILoadConnections
	| ILoadPatch
	| IRegisterConnector
	| ISelectionDrag
	| ISelectModule
	| ISetActiveConnectorKey
	| IUpdateModuleName
	| IUpdateModulePosition
	| IUpdateModuleState;

export const patchActions = {
	addModuleAction,
	blurInputAction,
	cancelLoadFromCloudAction,
	changeNameAction,
	clearActiveConnectorAction,
	clearPatchEditorAction,
	clickConnectorAction,
	deselectAllModulesAction,
	deselectModuleAction,
	focusInputAction,
	keyDownAction,
	keyUpAction,
	loadConnectionsAction,
	loadPatchAction,
	registerConnectorAction,
	selectionDragCancelAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	setActiveConnectorKeyAction,
	updateModuleNameAction,
	updateModulePositionAction,
	updateModuleStateAction,
};
