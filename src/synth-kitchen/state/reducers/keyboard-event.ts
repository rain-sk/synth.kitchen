import { IState } from '../types/state';
import { IKeyboardEvent, KeyboardEventType } from '../actions/keyboard-event';

export const keyboardEvent: React.Reducer<IState, IKeyboardEvent> = (
	state,
	action
) => {
	const { type, keyCode } = action.payload;
	switch (type) {
		case KeyboardEventType.KEY_DOWN: {
			console.log(type, keyCode);
			return {
				...state
			};
		}
		case KeyboardEventType.KEY_UP:
		default: {
			console.log(type, keyCode);
			return {
				...state
			};
		}
	}
};
