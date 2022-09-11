import { INVALID_POSITION, IState } from '../types/state';
import { ISelectionDrag, SelectionDragType } from '../actions/selection-drag';
import { IModule } from '../types/module';

type IRectangle = {
	x: number;
	y: number;
	width: number;
	height: number;
};

const rectContainsOtherRect = (
	rect: IRectangle,
	otherRect: IRectangle
): boolean => {
	return false;
};

const modulesInRange = (range: IRectangle, modules: IModule[]): Set<string> => {
	const moduleKeysInRange = new Set<string>();

	modules.forEach((module) => {
		if (rectContainsOtherRect(range, module)) {
			moduleKeysInRange.add(module.moduleKey);
		}
	});

	return moduleKeysInRange;
};

export const selectionDrag: React.Reducer<IState, ISelectionDrag> = (
	state,
	action
) => {
	const { position } = action.payload;
	switch (action.payload.type) {
		case SelectionDragType.DRAG_START: {
			return {
				...state,
				mouseDragStartPosition: position,
				mouseDragPosition: position
			};
		}
		case SelectionDragType.DRAG_CONTINUE: {
			const { mouseDragStartPosition, modules } = state;

			const potentiallySelectedModules = modulesInRange(
				{
					x: Math.min(mouseDragStartPosition[0], position[0]),
					y: Math.min(mouseDragStartPosition[1], position[1]),
					width: Math.abs(mouseDragStartPosition[0] - position[0]),
					height: Math.abs(mouseDragStartPosition[0] - position[0])
				},
				Object.values(modules)
			);

			return {
				...state,
				mouseDragPosition: position,
				modules: Object.fromEntries(
					Object.entries(modules).map(([moduleKey, module]) => {
						if (potentiallySelectedModules.has(moduleKey)) {
							return [moduleKey, { ...module }];
						}
						return [moduleKey, module];
					})
				)
			};
		}
		case SelectionDragType.DRAG_END:
		default: {
			const { mouseDragStartPosition } = state;

			return { ...state, mouseDragStartPosition: INVALID_POSITION };
		}
	}
};
