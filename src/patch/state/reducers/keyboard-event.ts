import { IPatchState } from '../types/patch';
import { IKeyboardEvent, KeyboardEventType } from '../actions/keyboard-event';
import {
	KeyCode,
	keyCodeModifierMap,
	keyCodeMovementMap,
	Modifier,
} from '../../../constants/key';
import {
	connectionInfo,
	connectorInfo,
	disconnect,
	disconnectSet,
	moduleConnectors,
} from '../connection';

export const keyboardEvent: React.Reducer<IPatchState, IKeyboardEvent> = (
	state,
	{ payload: { type, keyCode } },
) => {
	if (keyCode in keyCodeModifierMap) {
		const modifier = keyCodeModifierMap[keyCode];

		switch (type) {
			case KeyboardEventType.KEY_DOWN: {
				return {
					...state,
					heldModifiers: state.heldModifiers | modifier,
				};
			}
			case KeyboardEventType.KEY_UP: {
				return {
					...state,
					heldModifiers: state.heldModifiers & ~modifier,
				};
			}
		}
	} else if (
		keyCode in keyCodeMovementMap &&
		state.isKeyMovementEnabled &&
		type === KeyboardEventType.KEY_DOWN
	) {
		const { deltaX, deltaY } = keyCodeMovementMap[keyCode];

		return {
			...state,
			modulePositions: Object.fromEntries(
				Object.entries(state.modulePositions).map(([moduleKey, position]) => [
					moduleKey,
					state.selectedModuleKeys.has(moduleKey)
						? [position[0] + deltaX, position[1] + deltaY]
						: position,
				]),
			),
		};
	} else if (
		(keyCode === KeyCode.BACKSPACE || keyCode === KeyCode.DELETE) &&
		type === KeyboardEventType.KEY_DOWN &&
		state.isKeyMovementEnabled
	) {
		const connectionsOfSelectedModules = [...state.selectedModuleKeys]
			.filter((moduleKey) => moduleKey !== '0')
			.flatMap((moduleKey) => moduleConnectors(state.connectors, moduleKey))
			.map((key) => connectorInfo(state.connectors, key))
			.flatMap(([, connections]) => connections);

		const newState = disconnectSet(
			state.connections,
			state.connectors,
			connectionsOfSelectedModules,
		);

		newState.connectors = Object.fromEntries(
			Object.entries(newState.connectors).filter(
				([, [connector]]) =>
					connector.moduleKey === '0' ||
					!state.selectedModuleKeys.has(connector.moduleKey),
			),
		);

		const modules = Object.fromEntries(
			Object.entries(state.modules).filter(
				([moduleKey]) =>
					!state.selectedModuleKeys.has(moduleKey) || moduleKey === '0',
			),
		);

		const modulePositions = Object.fromEntries(
			Object.entries(state.modulePositions).filter(
				([moduleKey]) =>
					!state.selectedModuleKeys.has(moduleKey) || moduleKey === '0',
			),
		);

		return {
			...state,
			...newState,
			modules,
			modulePositions,
		};
	} else if (
		keyCode === KeyCode.A &&
		type === KeyboardEventType.KEY_DOWN &&
		((state.heldModifiers & Modifier.SPECIAL) === Modifier.SPECIAL ||
			(state.heldModifiers & Modifier.CONTROL) === Modifier.CONTROL)
	) {
		return {
			...state,
			selectedModuleKeys: new Set([
				...Object.values(state.modules).map((module) => module.moduleKey),
			]),
		};
	} else {
		return state;
	}
};
