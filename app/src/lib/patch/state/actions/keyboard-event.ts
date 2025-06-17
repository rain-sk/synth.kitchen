export enum KeyboardEventType {
	KEY_DOWN,
	KEY_UP
}

export type IKeyboardEvent = {
	type: 'KeyboardEvent';
	payload: {
		type: KeyboardEventType;
		keyCode: number;
	};
};

export const keyDownAction = (keyCode: number): IKeyboardEvent => ({
	type: 'KeyboardEvent',
	payload: {
		type: KeyboardEventType.KEY_DOWN,
		keyCode
	}
});

export const keyUpAction = (keyCode: number): IKeyboardEvent => ({
	type: 'KeyboardEvent',
	payload: {
		type: KeyboardEventType.KEY_UP,
		keyCode
	}
});
