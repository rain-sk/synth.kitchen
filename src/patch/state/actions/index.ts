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
import {
	ISetActiveConnectorKey,
	setActiveConnectorKeyAction,
} from './set-active-connector-key';
import {
	IRegisterConnector,
	IUnregisterConnector,
	registerConnectorAction,
	unregisterConnectorAction,
} from './connector-registration';
import { clickConnectorAction, IClickConnector } from './click-connector';
import { ILoadConnections, loadConnectionsAction } from './load-connections';

export type IPatchAction =
	| IAddModule
	| ICancelLoadFromCloud
	| IChangeName
	| IClickConnector
	| IDisableKeyMovement
	| IEnableKeyMovement
	| IKeyboardEvent
	| ILoadConnections
	| ILoadFromCloud
	| ILoadPatch
	| IRegisterConnector
	| ISelectionDrag
	| ISelectModule
	| ISetActiveConnectorKey
	| IUnregisterConnector
	| IUpdateModulePosition
	| IUpdateModule;

export const patchActions = {
	addModuleAction,
	cancelLoadFromCloudAction,
	changeNameAction,
	clickConnectorAction,
	deselectAllModulesAction,
	deselectModuleAction,
	disableKeyMovementAction,
	enableKeyMovementAction,
	keyDownAction,
	keyUpAction,
	loadConnectionsAction,
	loadFromCloudAction,
	loadPatchAction,
	registerConnectorAction,
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	selectModuleAction,
	selectSingleModuleAction,
	setActiveConnectorKeyAction,
	unregisterConnectorAction,
	updateModulePositionAction,
	updateModuleAction,
};
