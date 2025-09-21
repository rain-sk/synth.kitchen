import { IKeyboardEvent } from '../actions/keyboard-event';
import { KeyboardEventType } from '../actions/keyboard-event';
import { connectorInfo } from '../connection';
import { disconnectSet } from '../connection';
import { moduleConnectors } from '../connection';
import { cloneAndApply } from '../types/patch';
import { IPatchState } from '../types/patch';
import {
	KeyCode,
	keyCodeModifierMap,
	keyCodeMovementMap,
	Modifier,
} from '../../constants/key';

export const keyboardEvent: React.Reducer<IPatchState, IKeyboardEvent> = (
	state,
	{ payload: { type, keyCode } },
) => {
	if (keyCode in keyCodeModifierMap) {
		const modifier = keyCodeModifierMap[keyCode];

		switch (type) {
			case KeyboardEventType.KEY_DOWN: {
				return cloneAndApply(state, {
					heldModifiers: state.heldModifiers | modifier,
				});
			}
			case KeyboardEventType.KEY_UP: {
				return cloneAndApply(state, {
					heldModifiers: state.heldModifiers & ~modifier,
				});
			}
		}
	} else if (
		!state.focusedInput &&
		keyCode in keyCodeMovementMap &&
		type === KeyboardEventType.KEY_DOWN
	) {
		const { deltaX, deltaY } = keyCodeMovementMap[keyCode];

		return cloneAndApply(state, {
			modulePositions: Object.fromEntries(
				Object.entries(state.modulePositions).map(([id, position]) => [
					id,
					state.selectedModuleKeys.has(id)
						? [position[0] + deltaX, position[1] + deltaY]
						: position,
				]),
			),
		});
	} else if (
		!state.focusedInput &&
		(keyCode === KeyCode.BACKSPACE || keyCode === KeyCode.DELETE) &&
		type === KeyboardEventType.KEY_DOWN
	) {
		const connectionsOfSelectedModules = new Set(
			[...state.selectedModuleKeys]
				.filter((id) => id !== '0')
				.flatMap((id) => moduleConnectors(state.connectors, id))
				.map((key) => connectorInfo(state.connectors, key))
				.flatMap(([, connections]) => connections),
		);

		const newState = disconnectSet(
			state.connections,
			state.connectors,
			connectionsOfSelectedModules,
		);

		newState.connectors = Object.fromEntries(
			Object.entries(newState.connectors).filter(
				([, [connector]]) =>
					connector.moduleId === '0' ||
					!state.selectedModuleKeys.has(connector.moduleId),
			),
		);

		const modules = Object.fromEntries(
			Object.entries(state.modules).filter(
				([id]) => !state.selectedModuleKeys.has(id) || id === '0',
			),
		);

		const modulePositions = Object.fromEntries(
			Object.entries(state.modulePositions).filter(
				([id]) => !state.selectedModuleKeys.has(id) || id === '0',
			),
		);

		Object.values(newState.connections).forEach(([output, input]) => {
			if (state.selectedModuleKeys.has(output.moduleId)) {
				console.error('failed to delete output');
			}
			if (state.selectedModuleKeys.has(input.moduleId)) {
				console.error('failed to delete input');
			}
		});

		return cloneAndApply(state, {
			...newState,
			activeConnectorKey:
				state.activeConnectorKey &&
				state.activeConnectorKey in newState.connectors
					? state.activeConnectorKey
					: undefined,
			modules,
			modulePositions,
			selectedModuleKeys: new Set(
				state.selectedModuleKeys.has('0') ? ['0'] : [],
			),
		});
	} else if (
		keyCode === KeyCode.A &&
		type === KeyboardEventType.KEY_DOWN &&
		((state.heldModifiers & Modifier.SPECIAL) === Modifier.SPECIAL ||
			(state.heldModifiers & Modifier.CONTROL) === Modifier.CONTROL)
	) {
		return cloneAndApply(state, {
			selectedModuleKeys: new Set([
				...Object.values(state.modules).map((module) => module.id),
			]),
		});
	} else {
		return state;
	}
};
