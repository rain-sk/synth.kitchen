import { IState, Modifier } from '../types/state';
import { IKeyboardEvent, KeyboardEventType } from '../actions/keyboard-event';

enum KeyCode {
	SHIFT = 16,
	ARROW_LEFT = 37,
	ARROW_UP = 38,
	ARROW_RIGHT = 39,
	ARROW_DOWN = 40
}

const keyCodeModifierMap: Record<number, Modifier> = {
	[KeyCode.SHIFT]: Modifier.SHIFT
};

const keyCodeMovementMap: Record<number, { deltaX: number; deltaY: number }> = {
	[KeyCode.ARROW_LEFT]: {
		deltaX: -15,
		deltaY: 0
	},
	[KeyCode.ARROW_UP]: {
		deltaX: 0,
		deltaY: -15
	},
	[KeyCode.ARROW_RIGHT]: {
		deltaX: 15,
		deltaY: 0
	},
	[KeyCode.ARROW_DOWN]: {
		deltaX: 0,
		deltaY: 15
	}
};

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
	} else {
		console.log(type, keyCode);
		return state;
	}
};
