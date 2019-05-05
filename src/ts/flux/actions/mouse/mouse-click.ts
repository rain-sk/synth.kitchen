import { MouseAction } from '.';

export function mouseClick(id: string): { type: MouseAction, payload: { id: string } } {
	return {
		type: 'MOUSE_CLICK',
		payload: {
			id
		}
	};
}