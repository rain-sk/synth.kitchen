import { MouseAction } from '.';

export function mouseUp(id: string): { type: MouseAction, payload: { id: string } } {
	return {
		type: 'MOUSE_UP',
		payload: {
			id
		}
	};
}
