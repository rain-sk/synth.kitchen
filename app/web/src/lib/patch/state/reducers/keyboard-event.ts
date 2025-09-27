import {
	Input,
	IoType,
	ModulePosition,
	ModuleType,
	Output,
	randomId,
} from 'synth.kitchen-shared';

import { IPatchAction, patchActions } from '../actions';
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
					state.selectedModules.has(id)
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
		if (
			state.selectedModules.size === 0 &&
			state.selectedConnections.size > 0
		) {
			return cloneAndApply(state, {
				...disconnectSet(
					state.connections,
					state.connectors,
					state.selectedConnections,
				),
			});
		}

		const connectionsOfSelectedModules = new Set(
			[...state.selectedModules]
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
					!state.selectedModules.has(connector.moduleId),
			),
		);

		const modules = Object.fromEntries(
			Object.entries(state.modules).filter(
				([id]) => !state.selectedModules.has(id) || id === '0',
			),
		);

		const modulePositions = Object.fromEntries(
			Object.entries(state.modulePositions).filter(
				([id]) => !state.selectedModules.has(id) || id === '0',
			),
		);

		Object.values(newState.connections).forEach(([output, input]) => {
			if (state.selectedModules.has(output.moduleId)) {
				console.error('failed to delete output');
			}
			if (state.selectedModules.has(input.moduleId)) {
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
			selectedModules: new Set(state.selectedModules.has('0') ? ['0'] : []),
		});
	} else if (
		!state.focusedInput &&
		keyCode === KeyCode.A &&
		type === KeyboardEventType.KEY_DOWN &&
		((state.heldModifiers & Modifier.SPECIAL) === Modifier.SPECIAL ||
			(state.heldModifiers & Modifier.CONTROL) === Modifier.CONTROL)
	) {
		return cloneAndApply(state, {
			selectedModules: new Set([
				...Object.values(state.modules).map((module) => module.id),
			]),
		});
	} else if (
		!state.focusedInput &&
		keyCode === KeyCode.G &&
		type === KeyboardEventType.KEY_DOWN &&
		state.heldModifiers === 0 &&
		state.selectedConnections &&
		state.selectedConnections.size === 1
	) {
		const selectedConnection = [...state.selectedConnections][0];

		const [output, input] = state.connections[selectedConnection];

		const sourceModulePosition = state.modulePositions[output.moduleId];
		const targetModulePosition = state.modulePositions[input.moduleId];

		const newGainPosition: ModulePosition = [
			(sourceModulePosition[0] + targetModulePosition[0]) / 2,
			(sourceModulePosition[1] + targetModulePosition[1]) / 2,
		];

		const gainId = randomId();
		const gainInput = {
			moduleId: gainId,
			channel: 0,
			type: IoType.input,
		} as Input;
		const gainOutput = {
			moduleId: gainId,
			channel: 0,
			type: IoType.output,
		} as Output;

		const actions: IPatchAction[] = [...state.asyncActionQueue];
		actions.push(patchActions.clickConnectorAction(output));
		actions.push(patchActions.clickConnectorAction(input));
		actions.push(
			patchActions.addModuleAction(ModuleType.GAIN, newGainPosition, {
				id: gainId,
			}),
		);
		actions.push(patchActions.clickConnectorAction(output));
		actions.push(patchActions.clickConnectorAction(gainInput));
		actions.push(patchActions.clickConnectorAction(gainOutput));
		actions.push(patchActions.clickConnectorAction(input));
		actions.push(patchActions.selectModuleAction(gainId));
		return cloneAndApply(state, {
			asyncActionQueue: actions,
		});
	} else {
		return state;
	}
};
