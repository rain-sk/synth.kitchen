import { IoState } from '../state';

export const IoActivate = (state: IoState, payload: string): IoState => ({
    ...state,
    active: payload,
    pair: [payload, undefined]
});