import { IoState } from '../state';

export const IoClick = (state: IoState, payload: string): IoState => {
    if (!state.active) {
        return {
            ...state,
            dispatchLoop: [...state.dispatchLoop, { action: { type: 'IO_ACTIVATE' }, payload }]
        };
    } else {
        if (state.active === payload) {
            return {
                ...state,
                dispatchLoop: [...state.dispatchLoop, { action: { type: 'IO_DEACTIVATE' }}]
            };
        }
        return {
            ...state,
            pair: [state.active, payload],
            dispatchLoop: [...state.dispatchLoop, { action: { type: 'IO_PROCESS_PAIR' }}]
        };
    }
};