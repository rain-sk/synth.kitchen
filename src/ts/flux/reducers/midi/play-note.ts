import { State } from '../../state';

export const PlayNote = (state: State, payload: { id: number }): State => {
	const { notesOn } = state;
	notesOn.add(payload.id);
	return {
		...state,
		notesOn
	};
}