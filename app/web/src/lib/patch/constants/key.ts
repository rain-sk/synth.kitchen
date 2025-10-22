export enum Modifier {
	NONE = 0,
	SHIFT = 1 << 0,
	CONTROL = 1 << 1,
}

export enum Key {
	BACKSPACE = 'backspace',
	ENTER = 'enter',
	SHIFT = 'shift',
	CONTROL = 'control',
	SPACE = ' ',
	ARROW_LEFT = 'arrowleft',
	ARROW_UP = 'arrowup',
	ARROW_RIGHT = 'arrowright',
	ARROW_DOWN = 'arrowdown',
	DELETE = 'delete',
	A = 'a',
	C = 'c',
	D = 'd',
	F = 'f',
	G = 'g',
	L = 'l',
	P = 'p',
	S = 's',
	Z = 'z',
	META = 'meta',
	ESCAPE = 'escape',
}

export const keyModifierMap: Record<string, Modifier> = {
	[Key.SHIFT]: Modifier.SHIFT,
	[Key.META]: Modifier.CONTROL,
	[Key.CONTROL]: Modifier.CONTROL,
};

export const keyMovementMap: Record<
	string,
	{ deltaX: number; deltaY: number }
> = {
	[Key.ARROW_LEFT]: {
		deltaX: -15,
		deltaY: 0,
	},
	[Key.ARROW_UP]: {
		deltaX: 0,
		deltaY: -15,
	},
	[Key.ARROW_RIGHT]: {
		deltaX: 15,
		deltaY: 0,
	},
	[Key.ARROW_DOWN]: {
		deltaX: 0,
		deltaY: 15,
	},
};
