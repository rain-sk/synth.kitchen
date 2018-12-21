import { IoState } from '../state';

export const IoMouseUp = (state: IoState, payload: string): IoState => {
    if (state.active && state.active !== payload) {
        return {
            ...state,
            pair: [state.active, payload],
            dispatchQueue: [...state.dispatchQueue, { type: 'IO_PROCESS_PAIR' }]
        };
    }
    return {
        ...state
    };
};