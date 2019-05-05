import { State } from '../../state';

export const IoActivate = (state: State): State => ({
    ...state,
    active: true
});