import { IPatchState } from '../types/patch';

export const cloneAndApply = (
	state: IPatchState,
	update: Partial<IPatchState>,
) => {
	const newState: IPatchState = {
		// PatchInfo
		id: state.id,
		name: state.name,
		slug: state.slug,
		creator: state.creator,

		// PatchState
		modules: state.modules,
		modulePositions: state.modulePositions,
		selectedModuleKeys: state.selectedModuleKeys,

		// i/o
		activeConnectorKey: state.activeConnectorKey,
		connections: state.connections,
		connectors: state.connectors,
		io: state.io,
		parameters: state.parameters,

		// mouse info
		mouseDragStartPosition: state.mouseDragStartPosition,
		mouseDragPosition: state.mouseDragPosition,
		pendingSelection: state.pendingSelection,

		// keyboard info
		heldModifiers: state.heldModifiers,
		focusedInput: state.focusedInput,
	};
	for (let key in update) {
		(newState as any)[key] = (update as any)[key];
	}
	return newState;
};
