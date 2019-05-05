import { State } from '../../state';

export const StopNote = (state: State, payload: { id: number }): State => {
	const { notesOn } = state;
	notesOn.delete(payload.id);
	return {
		...state,
		notesOn
	};
}