import { IoState } from '../state';

export const IoDeactivate = (state: IoState): IoState => ({
    ...state,
    active: false,
    pair: [undefined, undefined]
});