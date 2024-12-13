import { IState, Modifier } from '../types/state';
import { IKeyboardEvent, KeyboardEventType } from '../actions/keyboard-event';
import {
	KeyCode,
	keyCodeModifierMap,
	keyCodeMovementMap,
} from '../../constants/key';

export const keyboardEvent: React.Reducer<IState, IKeyboardEvent> = (
	state,
	action,
) => {
	const { type, keyCode } = action.payload;

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
		action.payload.type === KeyboardEventType.KEY_DOWN
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
		state.isKeyMovementEnabled
	) {
		return {
			...state,
			modules: Object.fromEntries(
				Object.entries(state.modules).filter(
					([moduleKey]) =>
						!state.selectedModuleKeys.has(moduleKey) || moduleKey === '0',
				),
			),
			modulePositions: Object.fromEntries(
				Object.entries(state.modulePositions).filter(
					([moduleKey]) =>
						!state.selectedModuleKeys.has(moduleKey) || moduleKey === '0',
				),
			),
		};
	} else if (
		keyCode === KeyCode.A &&
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
		// console.log(type, keyCode);
		return state;
	}
};
