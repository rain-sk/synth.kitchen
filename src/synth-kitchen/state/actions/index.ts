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
	| ISelectionDrag
	| IUpdateModulePosition
	| IUpdateModuleState;

export const actions = {
	selectionDragContinueAction,
	selectionDragEndAction,
	selectionDragStartAction,
	updateModulePositionAction,
	updateModuleStateAction
};
