import { IState } from '../types/state';
import { IKeyboardEvent, KeyboardEventType } from '../actions/keyboard-event';
import {
	KeyCode,
	keyCodeModifierMap,
	keyCodeMovementMap
} from '../../constants/key';

export const keyboardEvent: React.Reducer<IState, IKeyboardEvent> = (
	state,
	action
) => {
	const { type, keyCode } = action.payload;

	if (keyCode in keyCodeModifierMap) {
		const modifier = keyCodeModifierMap[keyCode];

		switch (type) {
			case KeyboardEventType.KEY_DOWN: {
				return {
					...state,
					heldModifiers: state.heldModifiers | modifier
				};
			}
			case KeyboardEventType.KEY_UP: {
				return {
					...state,
					heldModifiers: state.heldModifiers & ~modifier
				};
			}
		}
	} else if (keyCode in keyCodeMovementMap) {
		const { deltaX, deltaY } = keyCodeMovementMap[keyCode];

		return {
			...state,
			modules: Object.fromEntries(
				Object.entries(state.modules).map(([moduleKey, module]) => [
					moduleKey,
					state.selectedModuleKeys.has(moduleKey)
						? {
								...module,
								x: module.x + deltaX,
								y: module.y + deltaY
						  }
						: module
				])
			)
		};
	} else if (keyCode === KeyCode.BACKSPACE || keyCode === KeyCode.DELETE) {
		return {
			...state,
			modules: Object.fromEntries(
				Object.entries(state.modules).filter(
					([moduleKey, module]) =>
						!state.selectedModuleKeys.has(moduleKey) || module.type === 'OUTPUT'
				)
			)
		};
	} else {
		console.log(type, keyCode);
		return state;
	}
};
