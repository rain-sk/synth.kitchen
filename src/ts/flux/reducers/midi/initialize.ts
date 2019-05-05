import { State } from '../../state';

export const Initialize = (state: State): State => {
	return {
		...state,
		initialized: true
	};
}