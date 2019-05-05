import { MouseAction } from '.';

export function mouseDown(id: string): { type: MouseAction, payload: { id: string } } {
	return {
		type: 'MOUSE_DOWN',
		payload: {
			id
		}
	};
}
