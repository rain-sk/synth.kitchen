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
import {
	blockHistoryAction,
	IBlockHistory,
	IPushToHistory,
	IRedo,
	IUnblockHistory,
	IUndo,
	pushToHistoryAction,
	redoAction,
	unblockHistoryAction,
	undoAction,
} from './history';
import { flushAsyncQueueAction, IFlushAsyncQueue } from './flush-async-queue';
import {
	connectAction,
	disconnectAction,
	IConnect,
	IDisconnect,
} from './connection';
import { ISelectModules, selectModulesAction } from './select-modules';

export type IPatchAction =
	| IAddModule
	| IBlockHistory
	| IBlurInput
	| ICancelLoadFromCloud
	| IChangeName
	| IClearActiveConnector
	| IClearPatchEditor
	| IClickConnector
	| IConnect
	| IDisconnect
	| IFlushAsyncQueue
	| IFocusInput
	| IKeyboardEvent
	| ILoadConnections
	| ILoadPatch
	| IRedo
	| IPushToHistory
	| IRegisterConnector
	| ISelectionDrag
	| ISelectModule
	| ISelectModules
	| ISetActiveConnectorKey
	| IUnblockHistory
	| IUndo
	| IUpdateModuleName
	| IUpdateModulePosition
	| IUpdateModuleState;

export const patchActions = {
	addModuleAction,
	blockHistoryAction,
	blurInputAction,
	cancelLoadFromCloudAction,
	changeNameAction,
	clearActiveConnectorAction,
	clearPatchEditorAction,
	clickConnectorAction,
	connectAction,
	deselectAllModulesAction,
	deselectModuleAction,
	disconnectAction,
	flushAsyncQueueAction,
	focusInputAction,
	keyDownAction,
	keyUpAction,
	loadConnectionsAction,
	loadPatchAction,
	pushToHistoryAction,
	redoAction,
	registerConnectorAction,
	selectionDragCancelAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectModulesAction,
	selectSingleModuleAction,
	setActiveConnectorKeyAction,
	unblockHistoryAction,
	undoAction,
	updateModuleNameAction,
	updateModulePositionAction,
	updateModuleStateAction,
};
