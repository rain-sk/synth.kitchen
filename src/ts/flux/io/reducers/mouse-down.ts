import { IoState } from '../state';

export const IoMouseDown = (state: IoState, payload: string): IoState => {
    if (!state.active) {
        return {
            ...state,
            dispatchQueue: [...state.dispatchQueue, { type: 'IO_ACTIVATE', payload }]
        };
    }
    return {
        ...state
    };
};