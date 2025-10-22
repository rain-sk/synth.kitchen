export enum KeyboardEventType {
	KEY_DOWN,
	KEY_UP,
}

export type IKeyboardEvent = {
	type: 'KeyboardEvent';
	payload: {
		type: KeyboardEventType;
		key: string;
	};
};

export const keyDownAction = (key: string): IKeyboardEvent => ({
	type: 'KeyboardEvent',
	payload: {
		type: KeyboardEventType.KEY_DOWN,
		key,
	},
});

export const keyUpAction = (key: string): IKeyboardEvent => ({
	type: 'KeyboardEvent',
	payload: {
		type: KeyboardEventType.KEY_UP,
		key,
	},
});
