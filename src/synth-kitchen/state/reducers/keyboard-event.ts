import { IState, Modifier } from '../types/state';
import { IKeyboardEvent, KeyboardEventType } from '../actions/keyboard-event';

enum KeyCode {
	SHIFT = 16
}

const keyCodeModifierMap: Record<number, Modifier> = {
	[KeyCode.SHIFT]: Modifier.SHIFT
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
	} else {
		console.log(type, keyCode);
		return state;
	}
};
