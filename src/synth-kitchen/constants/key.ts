import { Modifier } from '../state/types/state';

enum KeyCode {
	SHIFT = 16,
	ARROW_LEFT = 37,
	ARROW_UP = 38,
	ARROW_RIGHT = 39,
	ARROW_DOWN = 40
}

export const keyCodeModifierMap: Record<number, Modifier> = {
	[KeyCode.SHIFT]: Modifier.SHIFT
};

export const keyCodeMovementMap: Record<
	number,
	{ deltaX: number; deltaY: number }
> = {
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
