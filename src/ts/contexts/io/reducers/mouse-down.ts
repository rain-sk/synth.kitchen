import { IoState } from '../state';

export const IoMouseDown = (state: IoState, payload: string): IoState => {
    if (!state.active) {
        return {
            ...state,
            pair: [payload, undefined]
        };
    }
    return {
        ...state
    };
};