export enum Modifier {
	NONE = 0,
	SHIFT = 1 << 0,
	SPECIAL = 1 << 1,
	CONTROL = 1 << 2,
}

export enum KeyCode {
	BACKSPACE = 8,
	ENTER = 13,
	SHIFT = 16,
	CONTROL = 17,
	SPACE = 32,
	ARROW_LEFT = 37,
	ARROW_UP = 38,
	ARROW_RIGHT = 39,
	ARROW_DOWN = 40,
	DELETE = 46,
	A = 65,
	G = 71,
	Z = 90,
	SPECIAL = 224,
}

export const keyCodeModifierMap: Record<number, Modifier> = {
	[KeyCode.SHIFT]: Modifier.SHIFT,
	[KeyCode.SPECIAL]: Modifier.SPECIAL,
};

export const keyCodeMovementMap: Record<
	number,
	{ deltaX: number; deltaY: number }
> = {
	[KeyCode.ARROW_LEFT]: {
		deltaX: -15,
		deltaY: 0,
	},
	[KeyCode.ARROW_UP]: {
		deltaX: 0,
		deltaY: -15,
	},
	[KeyCode.ARROW_RIGHT]: {
		deltaX: 15,
		deltaY: 0,
	},
	[KeyCode.ARROW_DOWN]: {
		deltaX: 0,
		deltaY: 15,
	},
};
