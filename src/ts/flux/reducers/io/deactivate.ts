import { State } from '../../state';

export const IoDeactivate = (state: State): State => ({
    ...state,
    activePrimary: false,
    activeSecondary: false
});