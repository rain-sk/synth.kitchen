import { IoState } from '../state';

export const IoMouseUp = (state: IoState, payload: string): IoState => {
    if (state.active && state.active !== payload) {
        return {
            ...state,
            pair: [state.pair[0], payload],
            dispatchLoop: [...state.dispatchLoop, { action: { type: 'IO_PROCESS_PAIR' }}]
        };
    }
    return {
        ...state
    };
};