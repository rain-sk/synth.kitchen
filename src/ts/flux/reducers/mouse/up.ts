import { State } from '../../state';
import { ioConnect, ioDeactivate } from '../../actions/io';

export const MouseUp = (state: State, payload: { id: string }): State => {
	console.log('up');
	if (state.activePrimary && !state.activeSecondary) {
		return {
			...state,
			activeSecondary: payload.id,
			dispatchQueue: [ioConnect()]
		};
	}
	return {
		...state,
		active: false,
		activePrimary: false,
		activeSecondary: false,
		dispatchQueue: [ioDeactivate()]
	};
}