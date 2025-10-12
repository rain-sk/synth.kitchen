import {
	Connection,
	Input,
	IoType,
	Module,
	ModulePosition,
	ModuleType,
	Output,
	randomId,
} from 'synth.kitchen-shared';

import { patchActions } from '../actions';
import { IAddModule } from '../actions/add-module';
import { IConnect } from '../actions/connection';
import { IKeyboardEvent } from '../actions/keyboard-event';
import { KeyboardEventType } from '../actions/keyboard-event';
import { connectorInfo } from '../connection';
import { disconnectSet } from '../connection';
import { moduleConnectors } from '../connection';
import { cloneAndApply, cloneAndApplyWithHistory } from '../types/patch';
import { IPatchState } from '../types/patch';
import {
	KeyCode,
	keyCodeModifierMap,
	keyCodeMovementMap,
	Modifier,
} from '../../constants/key';
import { redo, undo } from './history';

const isShift = (heldModifiers: number) => {
	return (heldModifiers & Modifier.SHIFT) === Modifier.SHIFT;
};

const isCmdOrCtrl = (heldModifiers: number) => {
	return (
		(heldModifiers & Modifier.SPECIAL) === Modifier.SPECIAL ||
		(heldModifiers & Modifier.CONTROL) === Modifier.CONTROL
	);
};

const quickKeyMap: Record<number, ModuleType> = {
	[KeyCode.C]: ModuleType.COMPRESSOR,
	[KeyCode.D]: ModuleType.DELAY,
	[KeyCode.F]: ModuleType.FILTER,
	[KeyCode.G]: ModuleType.GAIN,
	[KeyCode.L]: ModuleType.LIMITER,
	[KeyCode.P]: ModuleType.PAN,
	[KeyCode.S]: ModuleType.SHIFT,
};

export const keyboardEvent: React.Reducer<IPatchState, IKeyboardEvent> = (
	state,
	{ payload: { type, keyCode } },
) => {
	const cmdOrCtrl = isCmdOrCtrl(state.heldModifiers);
	const shift = isShift(state.heldModifiers);

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

		return cloneAndApplyWithHistory(state, {
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
			return cloneAndApplyWithHistory(
				state,
				disconnectSet(
					state.connections,
					state.connectors,
					state.selectedConnections,
				),
			);
		}

		if (state.activeConnectorKey !== undefined) {
			const [_, connections] = state.connectors[state.activeConnectorKey];
			return cloneAndApplyWithHistory(state, {
				...disconnectSet(
					state.connections,
					state.connectors,
					new Set(connections),
				),
				activeConnectorKey: undefined,
				selectedConnections: new Set(),
				selectedModules: new Set(),
			});
		}

		let newState: Partial<IPatchState> = {};

		{
			const connectionsOfSelectedModules = new Set(
				Array.from(state.selectedModules)
					.filter((id) => id !== '0')
					.flatMap((id) => moduleConnectors(state.connectors, id))
					.map((key) => connectorInfo(state.connectors, key))
					.flatMap(([, connections]) => connections),
			);
			newState = disconnectSet(
				state.connections,
				state.connectors,
				connectionsOfSelectedModules,
			);

			newState.modules = {} as Record<string, Module>;
			newState.modulePositions = {} as Record<string, ModulePosition>;
			for (const id of Object.keys(state.modules)) {
				if (!state.selectedModules.has(id) || id === '0') {
					newState.modules[id] = state.modules[id];
					newState.modulePositions[id] = state.modulePositions[id];
				}
			}

			newState.activeConnectorKey = undefined;
			newState.selectedConnections = new Set();
			newState.selectedModules = new Set(
				state.selectedModules.has('0') ? ['0'] : [],
			);
		}

		// DEBUG
		Object.values(newState.connections?.state ?? []).forEach(
			([output, input]) => {
				if (state.selectedModules.has(output.moduleId)) {
					debugger;
				}
				if (state.selectedModules.has(input.moduleId)) {
					debugger;
				}
			},
		);

		return cloneAndApplyWithHistory(state, newState);
	} else if (
		!state.focusedInput &&
		keyCode === KeyCode.A &&
		type === KeyboardEventType.KEY_DOWN &&
		cmdOrCtrl
	) {
		return cloneAndApply(state, {
			selectedModules: new Set([
				...Object.values(state.modules).map((module) => module.id),
			]),
		});
	} else if (
		!state.focusedInput &&
		keyCode in quickKeyMap &&
		type === KeyboardEventType.KEY_DOWN &&
		state.heldModifiers === 0 &&
		state.selectedConnections &&
		state.selectedConnections.size > 0
	) {
		if (state.activeConnectorKey) {
			state = cloneAndApply(state, { activeConnectorKey: undefined });
		}

		const newState: Partial<IPatchState> = disconnectSet(
			state.connections,
			state.connectors,
			state.selectedConnections,
		);
		newState.asyncActionQueue = state.asyncActionQueue.slice();
		newState.selectedConnections = new Set();

		const newModuleIds = new Set<string>();
		const newModules: IAddModule[] = [];
		const newConnections: IConnect[] = [];

		for (const connectionKey of state.selectedConnections) {
			const [output, input] = state.connections.state[connectionKey];

			const sourceModulePosition = state.modulePositions[output.moduleId];
			const targetModulePosition = state.modulePositions[input.moduleId];
			const newModulePosition: ModulePosition = [
				(sourceModulePosition[0] + targetModulePosition[0]) / 2,
				(sourceModulePosition[1] + targetModulePosition[1]) / 2,
			];
			const moduleId = randomId();
			const moduleInput = {
				moduleId: moduleId,
				channel: 0,
				type: IoType.input,
			} as Input;
			const moduleOutput = {
				moduleId: moduleId,
				channel: 0,
				type: IoType.output,
			} as Output;

			newModuleIds.add(moduleId);
			newModules.push(
				patchActions.addModuleAction(quickKeyMap[keyCode], newModulePosition, {
					id: moduleId,
				}),
			);
			newConnections.push(
				patchActions.connectAction(output, moduleInput),
				patchActions.connectAction(moduleOutput, input),
			);
		}

		if (newModuleIds.size === 0) {
			return cloneAndApplyWithHistory(state, newState);
		}

		newState.asyncActionQueue.push(
			patchActions.blockHistoryAction(),
			...newModules,
			...newConnections,
			patchActions.selectModulesAction(newModuleIds),
			patchActions.pushToHistoryAction(true),
		);

		return cloneAndApply(state, newState);
	} else if (
		keyCode === KeyCode.Z &&
		type === KeyboardEventType.KEY_DOWN &&
		cmdOrCtrl
	) {
		return shift ? redo(state) : undo(state);
	} else {
		return state;
	}
};
