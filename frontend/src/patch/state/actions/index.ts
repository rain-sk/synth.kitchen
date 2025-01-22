import { addModuleAction, IAddModule } from './add-module';
import { changeNameAction, IChangeName } from './change-name';
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
import { clickConnectorAction, IClickConnector } from './click-connector';
import { ILoadConnections, loadConnectionsAction } from './load-connections';
import { blurInputAction, IBlurInput } from './input-blur';
import { focusInputAction, IFocusInput } from './input-focus';

export type IPatchAction =
	| IAddModule
	| ICancelLoadFromCloud
	| IChangeName
	| IClickConnector
	| IBlurInput
	| IFocusInput
	| IKeyboardEvent
	| ILoadConnections
	| ILoadPatch
	| IRegisterConnector
	| ISelectionDrag
	| ISelectModule
	| ISetActiveConnectorKey
	| IUpdateModulePosition
	| IUpdateModule;

export const patchActions = {
	addModuleAction,
	cancelLoadFromCloudAction,
	changeNameAction,
	clickConnectorAction,
	deselectAllModulesAction,
	deselectModuleAction,
	blurInputAction,
	focusInputAction,
	keyDownAction,
	keyUpAction,
	loadConnectionsAction,
	loadPatchAction,
	registerConnectorAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	setActiveConnectorKeyAction,
	updateModulePositionAction,
	updateModuleAction,
};
